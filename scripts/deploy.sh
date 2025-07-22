#!/usr/bin/env bash
set -euo pipefail

REPO="git@github.com:Jamesgibbs/shopproject.git"
DEST="/var/www/laravel-app"

# 1. Sync code
if [ -d "$DEST/.git" ]; then
  git -C "$DEST" fetch --all
  git -C "$DEST" reset --hard origin/main
else
  git clone "$REPO" "$DEST"
fi

# 2. Env file
cd "$DEST"
cp .env.example .env
# (run your inject_env_var function here)

# 3. Build & deploy containers
docker-compose -f docker-compose.prod.yml down --remove-orphans
docker-compose -f docker-compose.prod.yml build --no-cache app
docker-compose -f docker-compose.prod.yml up -d app nginx

# 4. Artisan commands
docker-compose exec -T app php artisan migrate --force --no-interaction
docker-compose exec -T app php artisan config:cache
docker-compose exec -T app php artisan route:cache
docker-compose exec -T app php artisan view:cache

echo "✅ Deployment complete"
