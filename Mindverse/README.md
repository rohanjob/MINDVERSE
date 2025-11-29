# 🕉️ MindVerse - Epic Spiritual Cinematic Universe

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes)](https://kubernetes.io/)

> **A deeply immersive devotional web application featuring cinematic parallax storytelling, divine temples, sacred stotrams, and mythological narratives — all centered around Lord Shiva, Lord Bhairava, and Lord Maha Vishnu.**

---

## 🌟 Features

### **Epic Cinematic Experience**
- ✨ **Long-scroll parallax storytelling** with multi-layered animations
- 🎨 **4K AI-generated divine imagery** of deities, temples, and cosmic scenes
- 🌊 **Dynamic particle systems** and smoke effects
- 💫 **Smooth scroll-triggered animations** using Framer Motion
- 🎭 **Mythologically authentic** visual design with modern polish
- ⚡ **Blazing fast** with Vite build tool

### **Modern Tech Stack**
- ⚛️ **React 18** with Vite for lightning-fast development
- 🚀 **FastAPI** async backend for optimal performance
- 🍃 **MongoDB** with Motor async driver
- ☸️ **Kubernetes-native** deployment architecture
- 🔄 **Separate CI/CD** pipelines for frontend and backend
- 🐳 **Docker containerization** with multi-stage builds

---

## 📁 Project Structure

```
MindVerse/
│
├── frontend/                    # React.js with Vite
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── sections/            # Page sections (Hero, Stories, etc.)
│   │   ├── animations/          # Animation utilities
│   │   ├── assets/              # Static assets organized by deity
│   │   │   ├── aum/
│   │   │   ├── temples/
│   │   │   ├── shiva/
│   │   │   ├── bhairava/
│   │   │   └── vishnu/
│   │   ├── pages/               # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── vite.config.js
│   └── package.json
│
├── backend/                     # FastAPI Python backend
│   ├── app/
│   │   ├── main.py              # FastAPI app entry
│   │   ├── db.py                # MongoDB connection
│   │   ├── routes/              # API routes
│   │   │   ├── health.py
│   │   │   ├── stories.py
│   │   │   ├── temples.py
│   │   │   └── stotrams.py
│   │   ├── models/              # Pydantic models
│   │   │   └── schemas.py
│   │   └── utils/               # Utility functions
│   ├── requirements.txt
│   └── Dockerfile
│
├── k8s/                         # Kubernetes manifests
│   ├── namespace.yaml
│   ├── frontend-deploy.yaml
│   ├── backend-deploy.yaml
│   ├── frontend-service.yaml
│   ├── backend-service.yaml
│   └── ingress.yaml
│
├── .github/
│   └── workflows/
│       ├── build-frontend.yml   # Frontend CI/CD
│       ├── build-backend.yml    # Backend CI/CD
│       └── deploy.yml           # Kubernetes deployment
│
├── mongodb-config/
│   └── init-mongo.js
│
├── docker-compose.yml
├── README.md
└── LICENSE
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **Python** 3.11 or higher
- **MongoDB** (local or cloud)
- **Docker** (optional, for containerization)
- **Kubernetes** (optional, for production deployment)

### Local Development

#### 1. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

#### 2. Setup Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend API runs on `http://localhost:8000`
API docs available at `http://localhost:8000/docs`

#### 3. Start MongoDB

```bash
mongod
```

---

## 🐳 Docker Deployment

### Using Docker Compose

```bash
docker-compose up -d
```

Access the application at `http://localhost`

Backend API at `http://localhost:8000/docs`

### Manual Docker Build

```bash
# Build frontend
cd frontend
docker build -t mindverse-frontend:latest .

# Build backend
cd ../backend
docker build -t mindverse-backend:latest .

# Run
docker run -p 80:80 mindverse-frontend:latest
docker run -p 8000:8000 mindverse-backend:latest
```

---

## ☸️ Kubernetes Deployment

### Quick Deploy

```bash
# Apply all manifests
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/backend-deploy.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deploy.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yaml

# Check status
kubectl get pods -n mindverse
kubectl get services -n mindverse
```

### Production Deployment Steps

1. **Build and push images**:
```bash
docker build -t YOUR_USERNAME/mindverse-frontend:latest ./frontend
docker push YOUR_USERNAME/mindverse-frontend:latest

docker build -t YOUR_USERNAME/mindverse-backend:latest ./backend
docker push YOUR_USERNAME/mindverse-backend:latest
```

2. **Update image names in k8s manifests**

3. **Deploy to cluster**:
```bash
kubectl apply -f k8s/
```

---

## 📡 API Endpoints

### FastAPI Backend (Port 8000)

- **Health**: `GET /api/health`
- **Stories**: 
  - `GET /api/stories`
  - `GET /api/stories/{id}`
  - `POST /api/stories`
- **Temples**: 
  - `GET /api/temples`
  - `GET /api/temples/{id}`
  - `POST /api/temples`
- **Stotrams**: 
  - `GET /api/stotrams?type=tandava`
  - `GET /api/stotrams/{id}`
  - `POST /api/stotrams`

Interactive API documentation: `http://localhost:8000/docs`

---

## 🎨 Design Philosophy

### Modern Frontend Architecture
- **Vite** for instant HMR and optimized builds
- **Path aliases** for clean imports (`@components`, `@sections`)
- **Code splitting** for optimal performance
- **Asset organization** by deity for clarity

### High-Performance Backend
- **Async/await** throughout for maximum concurrency
- **Motor** async MongoDB driver
- **Pydantic v2** for fast validation
- **Auto-generated API docs** with Swagger UI

### Color Palette
- Cosmic Deep Indigo: `#0f0c29`
- Divine Gold: `#f7b731`
- Divine Saffron: `#ff6b35`
- Ganga Blue: `#4a90e2`

---

## 🔧 Development

### Frontend (Vite)

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend (FastAPI)

```bash
cd backend

# Development server with auto-reload
uvicorn app.main:app --reload

# Production server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4

# Run with Python directly
python -m app.main
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Lord Shiva, Bhairava, and Vishnu** - Divine inspiration
- **FastAPI community** - Modern async framework
- **Vite team** - Lightning-fast build tool
- **React community** - Powerful UI library

---

## 🕉️ Divine Blessing

> **ॐ नमः शिवाय | ॐ नमो नारायणाय**  
> _Om Namah Shivaya | Om Namo Narayanaya_

**Har Har Mahadev! 🙏**

---

_Built with devotion, modern technology, and cosmic energy._
