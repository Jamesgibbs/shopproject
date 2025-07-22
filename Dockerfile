# ──────────────────────────────────────────────────────────────────────────────
# Stage 1: Build assets with Node
# ──────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /var/www

# 1) Copy just package files to install deps
COPY package.json package-lock.json ./

# 2) Install JS deps
RUN npm ci

# 3) Copy the rest of your frontend code & build
COPY . .
RUN npm run build   # writes to /var/www/public/build

ARG PUID=1000
ARG PGID=1000

RUN groupadd -g ${PGID} www-data \
 && useradd -u ${PUID} -g www-data -m laravel \

# ──────────────────────────────────────────────────────────────────────────────
# Stage 2: PHP runtime
# ──────────────────────────────────────────────────────────────────────────────
FROM php:8.3-fpm

# 2) Install system & PHP deps
RUN apt-get update \
 && apt-get install -y git curl zip unzip libpng-dev libxml2-dev libonig-dev libicu-dev default-mysql-client \
 && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd intl \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

# 3) Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4) Set working dir & copy your PHP app (excluding node_modules & public/build)
WORKDIR /var/www
COPY --chown=laravel:www-data . .

# 5) Pull in the built assets from the builder stage
COPY --from=builder --chown=laravel:www-data /var/www/public/build /var/www/public/build

# 6) Install PHP packages
RUN composer install --no-dev --optimize-autoloader --no-interaction

# 7) Fix permissions on storage & cache
RUN mkdir -p storage bootstrap/cache \
 && chown -R laravel:www-data storage bootstrap/cache

# 8) Switch to the laravel user and launch FPM
USER laravel
CMD ["php-fpm", "--nodaemonize"]
