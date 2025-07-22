FROM php:8.3-fpm

ARG PUID=1000
ARG PGID=1000

# Create the group and user with matching IDs
RUN groupadd -g ${PGID} laravel \
 && useradd -m -u ${PUID} -g laravel laravel \

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libicu-dev \
    default-mysql-client

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    node --version && \
    npm --version


# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd intl

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u 1000 -d /home/laravel laravel
RUN mkdir -p /home/laravel/.composer && \
    chown -R laravel:laravel /home/laravel

# Set working directory
WORKDIR /var/www

COPY . /var/www
RUN chown -R laravel:laravel /var/www

RUN chown -R laravel:www-data /var/www && \
    chmod -R 755 /var/www && \
    chmod -R 775 /var/www/storage /var/www/bootstrap/cache

ENV VITE_APP_URL=${APP_URL}
ENV ASSET_URL=${APP_URL}

# Install npm dependencies and build assets
RUN which npm && \
    npm ci && \
    npm run build && \
    ls -la /var/www/public/build

RUN composer install --no-interaction --optimize-autoloader --no-dev

# Configure PHP-FPM
RUN mkdir -p /var/run/php-fpm && \
    chown -R laravel:www-data /var/run/php-fpm

# Copy custom php-fpm.conf
COPY php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

# Switch to non-root user
USER laravel

# Start PHP-FPM in foreground
CMD ["php-fpm", "--nodaemonize"]
