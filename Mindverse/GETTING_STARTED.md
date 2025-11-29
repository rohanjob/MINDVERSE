# 🚀 MindVerse - Complete Getting Started Guide

## Welcome to MindVerse! 🕉️

This guide will walk you through every step needed to get MindVerse running locally or deployed to production.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Local Development](#local-development)
4. [Docker Deployment](#docker-deployment)
5. [Kubernetes Deployment](#kubernetes-deployment)
6. [GitHub Repository Setup](#github-repository-setup)
7. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

### Required Software

#### For Local Development:
- **Node.js** 18.x or higher → [Download](https://nodejs.org/)
- **Python** 3.11 or higher → [Download](https://www.python.org/)
- **MongoDB** Latest → [Download](https://www.mongodb.com/try/download/community)
- **Git** → [Download](https://git-scm.com/)

#### For Docker Deployment:
- **Docker Desktop** → [Download](https://www.docker.com/products/docker-desktop/)
- **Docker Compose** (included with Docker Desktop)

#### For Kubernetes Deployment:
- **kubectl** → [Install Guide](https://kubernetes.io/docs/tasks/tools/)
- **Kubernetes Cluster** (GKE, EKS, AKS, or local minikube)
- **Docker Hub Account** → [Sign Up](https://hub.docker.com/)

### Check Your Installation

Run these commands to verify:

```bash
node --version    # Should be v18.x.x or higher
python --version  # Should be 3.11.x or higher
docker --version  # Should show Docker version
mongo --version   # Should show MongoDB version
```

---

## 2. Installation

### Step 1: Navigate to Project Directory

```bash
cd c:\Users\Admin\Music\Mindverse
```

### Step 2: Run Setup Script

**Windows (PowerShell)**:
```powershell
.\setup.ps1
```

**Linux/Mac**:
```bash
chmod +x setup.sh
./setup.sh
```

This will install all dependencies for both frontend and backend.

### Manual Installation (Alternative)

If the script doesn't work, install manually:

**Frontend**:
```bash
cd mindverse-frontend
npm install
```

**Backend**:
```bash
cd mindverse-backend
pip install -r requirements.txt
```

---

## 3. Local Development

### Step 1: Start MongoDB

**Windows**:
```bash
# Start MongoDB service
net start MongoDB

# Or run mongod directly
mongod --dbpath C:\data\db
```

**Linux/Mac**:
```bash
mongod
```

### Step 2: Initialize Database (Optional)

```bash
mongo < mongodb-config/init-mongo.js
```

This creates sample data for testing.

### Step 3: Start Backend

Open a new terminal:

```bash
cd mindverse-backend
python app.py
```

You should see:
```
✅ Connected to MongoDB: mindverse_db
 * Running on http://0.0.0.0:5000
```

Test backend: Visit `http://localhost:5000/api/health`

### Step 4: Start Frontend

Open another terminal:

```bash
cd mindverse-frontend
npm start
```

The application will open automatically at `http://localhost:3000`

### 🎉 That's it! You're now running MindVerse locally!

---

## 4. Docker Deployment

### Option A: Using Docker Compose (Recommended)

**Start all services**:
```bash
docker-compose up -d
```

**Check status**:
```bash
docker-compose ps
```

**View logs**:
```bash
docker-compose logs -f
```

**Stop services**:
```bash
docker-compose down
```

**Access the application**: `http://localhost`

### Option B: Manual Docker Commands

**Build Images**:
```bash
# Frontend
docker build -t mindverse-frontend:latest ./mindverse-frontend

# Backend
docker build -t mindverse-backend:latest ./mindverse-backend
```

**Run Containers**:
```bash
# MongoDB
docker run -d --name mindverse-mongodb -p 27017:27017 mongo:latest

# Backend
docker run -d --name mindverse-backend \
  -p 5000:5000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/ \
  mindverse-backend:latest

# Frontend
docker run -d --name mindverse-frontend \
  -p 80:80 \
  mindverse-frontend:latest
```

**Access the application**: `http://localhost`

---

## 5. Kubernetes Deployment

### Step 1: Setup MongoDB

You have three options:

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `k8s/backend-deployment.yaml` with your MongoDB URI

**Option B: Deploy MongoDB on Kubernetes**
```bash
# Using Helm
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install mongodb bitnami/mongodb
```

**Option C: External MongoDB Server**
- Use your existing MongoDB server
- Ensure Kubernetes cluster can reach it

### Step 2: Build and Push Docker Images

```bash
# Login to Docker Hub
docker login

# Build and push frontend
cd mindverse-frontend
docker build -t YOUR_DOCKERHUB_USERNAME/mindverse-frontend:latest .
docker push YOUR_DOCKERHUB_USERNAME/mindverse-frontend:latest

# Build and push backend
cd ../mindverse-backend
docker build -t YOUR_DOCKERHUB_USERNAME/mindverse-backend:latest .
docker push YOUR_DOCKERHUB_USERNAME/mindverse-backend:latest
```

### Step 3: Update Kubernetes Manifests

Edit `k8s/frontend-deployment.yaml` and `k8s/backend-deployment.yaml`:

Replace:
```yaml
image: mindverse-frontend:latest
```

With:
```yaml
image: YOUR_DOCKERHUB_USERNAME/mindverse-frontend:latest
```

### Step 4: Deploy to Kubernetes

```bash
# Apply deployments
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml

# Check deployment status
kubectl get pods
kubectl get services

# Wait for pods to be ready
kubectl wait --for=condition=ready pod -l app=mindverse-frontend --timeout=300s
kubectl wait --for=condition=ready pod -l app=mindverse-backend --timeout=300s
```

### Step 5: Access the Application

**Get External IP** (if using LoadBalancer):
```bash
kubectl get service mindverse-frontend-service
```

**Or use Port Forward** (for testing):
```bash
kubectl port-forward service/mindverse-frontend-service 8080:80
```

Visit: `http://localhost:8080` or the external IP

### Step 6: Configure Domain & SSL (Optional)

1. Point your domain to the LoadBalancer IP
2. Install cert-manager:
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
```

3. Update `k8s/frontend-deployment.yaml` ingress section with your domain

---

## 6. GitHub Repository Setup

### Step 1: Initialize Git Repository

```bash
cd c:\Users\Admin\Music\Mindverse
git init
git add .
git commit -m "🕉️ Initial commit: MindVerse - Epic Spiritual Universe"
```

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name: `mindverse`
3. Visibility: Public or Private
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/mindverse.git
git branch -M main
git push -u origin main
```

### Step 4: Setup GitHub Actions (CI/CD)

Add these secrets to your repository:

1. Go to Settings → Secrets and variables → Actions
2. Add secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password/token
   - `KUBE_CONFIG`: Your kubeconfig file (base64 encoded)

To get base64 kubeconfig:
```bash
# Windows
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("$HOME\.kube\config"))

# Linux/Mac
cat ~/.kube/config | base64
```

### Step 5: Trigger Deployment

Once secrets are set, every push to `main` branch will:
1. Build Docker images
2. Push to Docker Hub
3. Deploy to Kubernetes

Try it:
```bash
git commit --allow-empty -m "Test CI/CD deployment"
git push origin main
```

Check progress: `https://github.com/YOUR_USERNAME/mindverse/actions`

---

## 7. Troubleshooting

### Frontend Issues

**Problem**: `npm install` fails
```bash
# Solution: Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem**: Port 3000 already in use
```bash
# Solution: Use different port
PORT=3001 npm start
```

### Backend Issues

**Problem**: MongoDB connection failed
```bash
# Solution: Verify MongoDB is running
mongo --eval "db.runCommand({ ping: 1 })"

# Check connection string
python -c "from pymongo import MongoClient; print(MongoClient('mongodb://localhost:27017').server_info())"
```

**Problem**: Module not found
```bash
# Solution: Reinstall dependencies
pip install -r requirements.txt
```

### Docker Issues

**Problem**: Build fails
```bash
# Solution: Clear Docker cache
docker system prune -a
docker-compose build --no-cache
```

**Problem**: Container won't start
```bash
# Solution: Check logs
docker-compose logs frontend
docker-compose logs backend
```

### Kubernetes Issues

**Problem**: Pods not starting
```bash
# Check pod events
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name>

# Check node resources
kubectl top nodes
```

**Problem**: Image pull error
```bash
# Solution: Verify image exists on Docker Hub
docker pull YOUR_USERNAME/mindverse-frontend:latest

# Update imagePullPolicy
kubectl edit deployment mindverse-frontend
# Change imagePullPolicy to Always or IfNotPresent
```

**Problem**: Service not accessible
```bash
# Check service
kubectl get endpoints

# Test from within cluster
kubectl run -it --rm debug --image=busybox --restart=Never -- wget -O- http://backend-service:5000/api/health
```

---

## 🎯 Common Tasks

### Update Frontend Code

```bash
cd mindverse-frontend
# Make your changes
npm run build

# If using Docker
docker-compose build frontend
docker-compose up -d frontend

# If using Kubernetes
docker build -t YOUR_USERNAME/mindverse-frontend:latest .
docker push YOUR_USERNAME/mindverse-frontend:latest
kubectl rollout restart deployment/mindverse-frontend
```

### Update Backend Code

```bash
cd mindverse-backend
# Make your changes

# If using Docker
docker-compose build backend
docker-compose up -d backend

# If using Kubernetes
docker build -t YOUR_USERNAME/mindverse-backend:latest .
docker push YOUR_USERNAME/mindverse-backend:latest
kubectl rollout restart deployment/mindverse-backend
```

### View Application Logs

**Docker**:
```bash
docker-compose logs -f frontend
docker-compose logs -f backend
```

**Kubernetes**:
```bash
kubectl logs -f deployment/mindverse-frontend
kubectl logs -f deployment/mindverse-backend
```

### Scale Application

**Docker Compose**:
```bash
docker-compose up -d --scale frontend=3 --scale backend=2
```

**Kubernetes**:
```bash
kubectl scale deployment mindverse-frontend --replicas=5
kubectl scale deployment mindverse-backend --replicas=3
```

---

## 📞 Need Help?

If you encounter any issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review logs using commands above
3. Check [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed guides
4. Search existing GitHub issues
5. Create a new issue with:
   - Your operating system
   - Error messages
   - Steps to reproduce
   - Relevant logs

---

## 🕉️ Congratulations!

You've successfully set up MindVerse! May your journey be blessed.

**ॐ नमः शिवाय | Har Har Mahadev! 🙏**

---

_For more information, see:_
- [README.md](README.md) - Project overview
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Advanced deployment
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Complete project details
