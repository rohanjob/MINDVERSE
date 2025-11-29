# MindVerse Quick Start Script for Windows
# PowerShell Script

Write-Host "🕉️  MindVerse - Epic Spiritual Universe Setup" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow

# Check Node.js
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18.x or higher." -ForegroundColor Red
    exit 1
}
$nodeVersion = node --version
Write-Host "✅ Node.js $nodeVersion" -ForegroundColor Green

# Check Python
if (!(Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Python is not installed. Please install Python 3.11 or higher." -ForegroundColor Red
    exit 1
}
$pythonVersion = python --version
Write-Host "✅ $pythonVersion" -ForegroundColor Green

# Check Docker
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  Docker is not installed. Docker is optional for local development." -ForegroundColor Yellow
} else {
    $dockerVersion = docker --version
    Write-Host "✅ $dockerVersion" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Starting setup..." -ForegroundColor Yellow
Write-Host ""

# Setup Frontend
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location mindverse-frontend
npm install
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
Write-Host ""

# Setup Backend
Write-Host "🐍 Installing backend dependencies..." -ForegroundColor Yellow
Set-Location ../mindverse-backend
pip install -r requirements.txt
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
Write-Host ""

Set-Location ..

Write-Host "✨ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Start MongoDB:" -ForegroundColor White
Write-Host "   mongod" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Initialize database (optional):" -ForegroundColor White
Write-Host "   mongo < mongodb-config/init-mongo.js" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Start backend:" -ForegroundColor White
Write-Host "   cd mindverse-backend; python app.py" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Start frontend (in new terminal):" -ForegroundColor White
Write-Host "   cd mindverse-frontend; npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Or use Docker Compose:" -ForegroundColor White
Write-Host "   docker-compose up -d" -ForegroundColor Gray
Write-Host ""
Write-Host "🕉️  Har Har Mahadev! May your development journey be blessed!" -ForegroundColor Cyan
Write-Host ""
