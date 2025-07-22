# ──────────────────────────────────────────────────────────────────────────────
# Stage 1: Build assets with Node
# ──────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS nodebuilder

WORKDIR /var/www

# Install JS deps
COPY package.json package-lock.json ./
RUN npm ci

# Build your frontend
COPY . .
RUN npm run build   # outputs into /var/www/public/build


# ──────────────────────────────────────────────────────────────────────────────
# Stage 2: PHP runtime
# ──────────────────────────────────────────────────────────────────────────────
FROM php:8.3-fpm

# Allow overriding the UID/GID at build time
ARG PUID=1000
ARG PGID=1000

# 1) Create laravel:www-data
#RUN groupadd -g ${PGID} www-data \
# && useradd -u ${PUID} -g www-data -m laravel

# 2) System & PHP extensions
RUN apt-get update \
 && apt-get install -y \
      git curl zip unzip \
      libpng-dev libxml2-dev libonig-dev libicu-dev \
      default-mysql-client \
 && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd intl \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# 3) Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4) Copy PHP code (minus node_modules & public/build)
WORKDIR /var/www
COPY --chown=www-data . .

# 5) Pull in built frontend assets
COPY --from=nodebuilder --chown=www-data \
     /var/www/public/build /var/www/public/build

# 6) Install PHP packages
RUN composer install --no-dev --optimize-autoloader --no-interaction \
 && mkdir -p storage bootstrap/cache \
 && chown -R www-data storage bootstrap/cache

# 7) Ensure storage & cache are writable
RUN mkdir -p storage bootstrap/cache \
 && chown -R www-data storage bootstrap/cache

# 8) Run as non-root
USER www-data
CMD ["php-fpm", "--nodaemonize"]
