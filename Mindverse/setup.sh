#!/bin/bash

# MindVerse Quick Start Script
# This script sets up the development environment

set -e

echo "🕉️  MindVerse - Epic Spiritual Universe Setup"
echo "=============================================="
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18.x or higher."
    exit 1
fi
echo "✅ Node.js $(node --version)"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.11 or higher."
    exit 1
fi
echo "✅ Python $(python3 --version)"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. Docker is optional for local development."
else
    echo "✅ Docker $(docker --version)"
fi

echo ""
echo "🚀 Starting setup..."
echo ""

# Setup Frontend
echo "📦 Installing frontend dependencies..."
cd mindverse-frontend
npm install
echo "✅ Frontend dependencies installed"
echo ""

# Setup Backend
echo "🐍 Installing backend dependencies..."
cd ../mindverse-backend
pip3 install -r requirements.txt
echo "✅ Backend dependencies installed"
echo ""

cd ..

echo "✨ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo ""
echo "1. Start MongoDB:"
echo "   mongod"
echo ""
echo "2. Initialize database (optional):"
echo "   mongo < mongodb-config/init-mongo.js"
echo ""
echo "3. Start backend:"
echo "   cd mindverse-backend && python app.py"
echo ""
echo "4. Start frontend (in new terminal):"
echo "   cd mindverse-frontend && npm start"
echo ""
echo "5. Or use Docker Compose:"
echo "   docker-compose up -d"
echo ""
echo "🕉️  Har Har Mahadev! May your development journey be blessed!"
echo ""
