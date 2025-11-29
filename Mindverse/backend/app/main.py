from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.db import connect_to_mongo, close_mongo_connection
from app.routes import stories, temples, stotrams, health

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()

app = FastAPI(
    title="MindVerse API",
    description="Epic Spiritual Devotional Platform API",
    version="2.0.0",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["Health"])
app.include_router(stories.router, prefix="/api/stories", tags=["Stories"])
app.include_router(temples.router, prefix="/api/temples", tags=["Temples"])
app.include_router(stotrams.router, prefix="/api/stotrams", tags=["Stotrams"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to MindVerse API",
        "version": "2.0.0",
        "description": "Epic Spiritual Devotional Platform API",
        "framework": "FastAPI",
        "docs": "/docs",
        "endpoints": {
            "stories": "/api/stories",
            "temples": "/api/temples",
            "stotrams": "/api/stotrams",
            "health": "/api/health"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
