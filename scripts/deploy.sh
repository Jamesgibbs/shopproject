#!/usr/bin/env bash
set -euo pipefail

# Arguments
ARTIFACT_PATH="$1"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/laravel-app}"
REPO_URL="git@github.com:Jamesgibbs/shopproject.git"
ENV_FILE=".env"

HOST_UID=$(id -u)
HOST_GID=$(id -g)

export UID=$HOST_UID
export GID=$HOST_GID

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

# Helper: inject or update key=value in .env
inject_env_var() {
  local key="$1"
  local value="$2"
  if grep -q "^${key}=" "$ENV_FILE"; then
    sed -i "s|^${key}=.*|${key}=${value}|" "$ENV_FILE"
  else
    echo "${key}=${value}" >> "$ENV_FILE"
  fi
}

# Generate APP_KEY if missing
if ! grep -q "^APP_KEY=base64" "$ENV_FILE"; then
  echo "🔑 Generating APP_KEY…"
  php -r "echo 'APP_KEY=base64:'.base64_encode(random_bytes(32)).\"\n\";" >> "$ENV_FILE"
fi

# Inject required values
inject_env_var "APP_ENV" "production"
inject_env_var "APP_DEBUG" "true"
inject_env_var "APP_URL" "$HOST"
inject_env_var "DB_HOST" "$DB_CONTAINER"
inject_env_var "DB_DATABASE" "$DB_DATABASE"
inject_env_var "DB_USERNAME" "$DB_USERNAME"
inject_env_var "DB_PASSWORD" "$DB_PASSWORD"
inject_env_var "MYSQL_USER" "$DB_USERNAME"
inject_env_var "MYSQL_PASSWORD" "$DB_PASSWORD"
inject_env_var "MYSQL_ROOT_PASSWORD" "$DB_PASSWORD"
inject_env_var "ASSET_URL" "$HOST"
inject_env_var "VITE_APP_NAME" "Laravel"

# 5. Permissions
echo "🔐 Applying directory permissions…"
mkdir -p storage/logs storage/framework/{sessions,views,cache}
chown -R "$USER":www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache


# 6. Docker Compose (build & deploy containers)
echo "🐳 Building and restarting Docker services…"
docker-compose -f docker-compose.prod.yml down --remove-orphans
docker system prune -f
docker-compose -f docker-compose.prod.yml build --no-cache \
  --build-arg PUID=$HOST_UID \
  --build-arg PGID=$HOST_GID
docker-compose -f docker-compose.prod.yml up -d

docker-compose exec app chown -R laravel:www-data /var/www
docker-compose exec app chmod -R 775 /var/www

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
