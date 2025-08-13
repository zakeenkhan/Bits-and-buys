#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment..."

# Navigate to the frontend directory
echo "📦 Building frontend..."
cd frontend
npm install
npm run build

# Navigate to the backend directory
echo "⚙️ Setting up backend..."
cd ../backend
npm install

# Copy frontend build to backend public folder
echo "📂 Copying frontend build to backend..."
rm -rf public
mkdir -p public
cp -r ../frontend/build/* public/

echo "✅ Deployment setup complete!"
echo "To start the production server, run:"
echo "cd backend && NODE_ENV=production node server.js"
