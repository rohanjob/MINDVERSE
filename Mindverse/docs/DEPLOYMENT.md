# MindVerse Deployment Guide

## 🚀 Deployment Options

### Option 1: Kubernetes Deployment (Recommended for Production)

#### Prerequisites
- Kubernetes cluster (v1.24+)
- kubectl configured
- Docker registry access
- MongoDB server (separate)

#### Step-by-Step Deployment

**1. Prepare Docker Images**

```bash
# Login to Docker registry
docker login

# Build and tag frontend
cd mindverse-frontend
docker build -t yourusername/mindverse-frontend:latest .
docker push yourusername/mindverse-frontend:latest

# Build and tag backend
cd ../mindverse-backend
docker build -t yourusername/mindverse-backend:latest .
docker push yourusername/mindverse-backend:latest
```

**2. Configure MongoDB Connection**

Edit `k8s/backend-deployment.yaml` and update the ConfigMap:

```yaml
data:
  MONGODB_URI: "mongodb://your-mongodb-server:27017/"
```

**3. Deploy to Kubernetes**

```bash
# Create namespace (optional)
kubectl create namespace mindverse

# Apply deployments
kubectl apply -f k8s/frontend-deployment.yaml -n mindverse
kubectl apply -f k8s/backend-deployment.yaml -n mindverse

# Verify deployment
kubectl get pods -n mindverse
kubectl get services -n mindverse
```

**4. Access the Application**

```bash
# Get external IP (LoadBalancer)
kubectl get service mindverse-frontend-service -n mindverse

# Or use port-forward for testing
kubectl port-forward service/mindverse-frontend-service 8080:80 -n mindverse
```

Visit `http://localhost:8080` or the LoadBalancer external IP.

---

### Option 2: Docker Compose (Local/Development)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: mindverse-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
      - ./mongodb-config/init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js

  backend:
    build: ./mindverse-backend
    container_name: mindverse-backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/
      - DB_NAME=mindverse_db
    depends_on:
      - mongodb

  frontend:
    build: ./mindverse-frontend
    container_name: mindverse-frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

Run:

```bash
docker-compose up -d
```

---

### Option 3: Cloud Deployment

#### Google Kubernetes Engine (GKE)

```bash
# Create cluster
gcloud container clusters create mindverse-cluster \
  --zone us-central1-a \
  --num-nodes 3

# Get credentials
gcloud container clusters get-credentials mindverse-cluster

# Deploy
kubectl apply -f k8s/
```

#### AWS EKS

```bash
# Create cluster
eksctl create cluster \
  --name mindverse-cluster \
  --region us-east-1 \
  --nodes 3

# Deploy
kubectl apply -f k8s/
```

#### Azure AKS

```bash
# Create cluster
az aks create \
  --resource-group mindverse-rg \
  --name mindverse-cluster \
  --node-count 3 \
  --enable-addons monitoring

# Get credentials
az aks get-credentials --resource-group mindverse-rg --name mindverse-cluster

# Deploy
kubectl apply -f k8s/
```

---

## 🔧 Configuration

### Environment Variables

#### Frontend
- `REACT_APP_API_URL` - Backend API URL

#### Backend
- `MONGODB_URI` - MongoDB connection string
- `DB_NAME` - Database name
- `PORT` - API port (default: 5000)
- `FLASK_ENV` - Environment (production/development)

### Kubernetes Secrets

Create secrets for sensitive data:

```bash
kubectl create secret generic mongodb-credentials \
  --from-literal=uri='mongodb://user:password@host:27017/' \
  -n mindverse
```

Update deployment to use secrets:

```yaml
env:
- name: MONGODB_URI
  valueFrom:
    secretKeyRef:
      name: mongodb-credentials
      key: uri
```

---

## 📊 Monitoring & Logging

### Health Checks

```bash
# Backend health
curl http://backend-url/api/health

# Frontend availability
curl http://frontend-url/
```

### Kubernetes Monitoring

```bash
# Check logs
kubectl logs -f deployment/mindverse-frontend -n mindverse
kubectl logs -f deployment/mindverse-backend -n mindverse

# Check resource usage
kubectl top pods -n mindverse
kubectl top nodes
```

### Prometheus & Grafana (Optional)

```bash
# Install Prometheus
helm install prometheus prometheus-community/prometheus

# Install Grafana
helm install grafana grafana/grafana
```

---

## 🔄 CI/CD with GitHub Actions

### Setup Secrets

1. Go to GitHub repository → Settings → Secrets
2. Add the following secrets:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
   - `KUBE_CONFIG` (base64 encoded kubeconfig)

### Trigger Deployment

```bash
# Push to main branch
git push origin main

# GitHub Actions will automatically:
# 1. Build Docker images
# 2. Push to registry
# 3. Deploy to Kubernetes
```

---

## 🔒 Security Best Practices

1. **HTTPS/TLS**: Use cert-manager for automatic TLS certificates
2. **Network Policies**: Restrict pod-to-pod communication
3. **RBAC**: Use role-based access control
4. **Image Scanning**: Scan Docker images for vulnerabilities
5. **Secrets Management**: Use Kubernetes secrets or external vaults

---

## 📈 Scaling

### Horizontal Pod Autoscaling

```bash
# Apply HPA for frontend
kubectl autoscale deployment mindverse-frontend \
  --cpu-percent=70 \
  --min=3 \
  --max=10 \
  -n mindverse

# Apply HPA for backend
kubectl autoscale deployment mindverse-backend \
  --cpu-percent=70 \
  --min=2 \
  --max=8 \
  -n mindverse
```

### Database Scaling

Consider MongoDB Atlas or MongoDB Replica Set for production:

```bash
# Deploy MongoDB Replica Set on Kubernetes
helm install mongodb bitnami/mongodb-sharded
```

---

## 🐛 Troubleshooting

### Common Issues

**Pods not starting:**
```bash
kubectl describe pod <pod-name> -n mindverse
kubectl logs <pod-name> -n mindverse
```

**Service not accessible:**
```bash
kubectl get endpoints -n mindverse
kubectl describe service mindverse-frontend-service -n mindverse
```

**Database connection issues:**
```bash
# Test MongoDB connection from backend pod
kubectl exec -it <backend-pod> -n mindverse -- python -c "from pymongo import MongoClient; print(MongoClient('mongodb://...').server_info())"
```

---

## 🎯 Performance Optimization

1. **Enable CDN** for static assets
2. **Use Redis** for caching API responses
3. **Optimize images** with WebP format
4. **Enable Gzip** compression (already configured in nginx)
5. **Implement lazy loading** for components

---

## 📝 Maintenance

### Backup MongoDB

```bash
# Create backup
mongodump --uri="mongodb://host:27017/mindverse_db" --out=/backup/

# Restore backup
mongorestore --uri="mongodb://host:27017/mindverse_db" /backup/mindverse_db/
```

### Update Deployment

```bash
# Update image
kubectl set image deployment/mindverse-frontend \
  frontend=yourusername/mindverse-frontend:v2.0 \
  -n mindverse

# Rollback if needed
kubectl rollout undo deployment/mindverse-frontend -n mindverse
```

---

**🕉️ Happy Deploying! Har Har Mahadev!**
