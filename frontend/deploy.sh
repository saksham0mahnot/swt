#!/bin/bash

echo "🚀 Starting deployment for swt-react..."

# Step 1: Pull latest code
echo "📥 Pulling latest code..."
git pull origin master || { echo "❌ Git pull failed"; exit 1; }

# Step 2: Install dependencies
echo "📦 Installing dependencies..."
npm install || { echo "❌ npm install failed"; exit 1; }

# Step 3: Build the app
echo "🔨 Building the React app..."
npm run build || { echo "❌ Build failed"; exit 1; }

# Step 4: Sync build to production directory
echo "📁 Deploying to /var/www/skipwithtrips..."
rsync -a --delete dist/ /var/www/skipwithtrips/ || { echo "❌ rsync failed"; exit 1; }

echo "✅ Deployment complete!"
