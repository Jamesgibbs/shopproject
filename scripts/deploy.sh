#!/usr/bin/env bash
set -euo pipefail

ARTIFACT_PATH="$1"      # no longer used
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/laravel-app}"
REPO_URL="git@github.com:Jamesgibbs/shopproject.git"

echo "🛠  Starting deploy"

# 1) Clone or update your PHP repo
if [ -d "$DEPLOY_PATH/.git" ]; then
  git -C "$DEPLOY_PATH" fetch --all
  git -C "$DEPLOY_PATH" reset --hard origin/main
else
  git clone "$REPO_URL" "$DEPLOY_PATH"
fi

# 2) Inject .env (same as before)
cd "$DEPLOY_PATH"
cp .env.example .env
# … your inject_env_var() logic …

# 3) Build & launch your multi-stage image
export UID=$(id -u)
export GID=$(id -g)

docker-compose -f docker-compose.prod.yml down --remove-orphans
docker-compose -f docker-compose.prod.yml build --no-cache app
docker-compose -f docker-compose.prod.yml up -d

# 4) Run migrations & caches
docker-compose exec -T app php artisan migrate --force
docker-compose exec -T app php artisan config:cache
docker-compose exec -T app php artisan route:cache
docker-compose exec -T app php artisan view:cache

echo "✅ Deployment finished"
