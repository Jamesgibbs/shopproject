#!/usr/bin/env bash
set -euo pipefail

# Arguments
ARTIFACT_PATH="$1"                     # e.g. /tmp/build.zip
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/laravel-app}"
REPO_URL="git@github.com:Jamesgibbs/shopproject.git"
ENV_FILE=".env"

echo "🛠  Starting deployment script"
echo "    Artifact: $ARTIFACT_PATH"
echo "    Deploy path: $DEPLOY_PATH"

# 1. Unpack build artifacts
echo "📦 Unpacking front-end assets…"
rm -rf /tmp/deploy
mkdir -p /tmp/deploy
unzip -o "$ARTIFACT_PATH" -d /tmp/deploy

# 2. Clone or update the repository
echo "🔄 Syncing application code…"
if [ -d "$DEPLOY_PATH/.git" ]; then
  git -C "$DEPLOY_PATH" fetch --all
  git -C "$DEPLOY_PATH" reset --hard origin/main
else
  rm -rf "$DEPLOY_PATH"
  git clone "$REPO_URL" "$DEPLOY_PATH"
fi

# 3. Copy front-end build into place
echo "🚚 Copying front-end assets…"
mkdir -p "$DEPLOY_PATH/public/build"
cp -r /tmp/deploy/public/build/* "$DEPLOY_PATH/public/build/"

# 4. Environment setup
echo "⚙️  Setting up environment file…"
cd "$DEPLOY_PATH"
cp .env.example "$ENV_FILE"

# (Optional) generate a new APP_KEY if none exists
if ! grep -q "^APP_KEY=base64" "$ENV_FILE"; then
  echo "🔑 Generating APP_KEY…"
  php -r "echo 'APP_KEY=base64:'.base64_encode(random_bytes(32)).\"\n\";" >> "$ENV_FILE"
fi

echo "DB_PASSWORD=$DB_PASSWORD" >> "$ENV_FILE"
echo "DB_USERNAME=$DB_USERNAME" >> "$ENV_FILE"

echo "APP_ENV=production" >> "$ENV_FILE"
echo "DB_DATABASE=$DB_DATABASE" >> "$ENV_FILE"
echo "APP_DEBUG=false" >> "$ENV_FILE"
echo "APP_URL=$HOST" >> "$ENV_FILE"
echo "DB_HOST=$DB_CONTAINER" >> "$ENV_FILE"

echo "MYSQL_USER=$DB_USERNAME" >> "$ENV_FILE"
echo "MYSQL_PASSWORD=$DB_PASSWORD" >> "$ENV_FILE"
echo "MYSQL_ROOT_PASSWORD=$DB_PASSWORD" >> "$ENV_FILE"

# 5. Permissions
echo "🔐 Applying directory permissions…"
mkdir -p storage/logs storage/framework/{sessions,views,cache}
chown -R "$USER":www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# 6. Docker Compose (build & deploy containers)
echo "🐳 Building and restarting Docker services…"
docker-compose -f docker-compose.prod.yml down --remove-orphans
docker system prune -f
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# 7. Post-deploy housekeeping
echo "⏱  Waiting for containers to start…"
sleep 15

echo "🔧 Running Laravel artisan commands…"
docker-compose -f docker-compose.prod.yml exec -T app \
  bash -lc "php artisan migrate --force && \
            php artisan config:cache && \
            php artisan route:cache && \
            php artisan view:cache"

echo "✅ Deployment complete!"
