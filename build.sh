#!/usr/bin/env bash
set -e

echo "==> Building frontend..."
cd frontend
npm install --silent
npm run build:static
cd ..

echo "==> Copying static files to backend..."
rm -rf backend/static
cp -r frontend/out backend/static

echo "==> Done! Frontend built and copied to backend/static/"
