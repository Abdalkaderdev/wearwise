from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to WearWise AI API",
        "version": settings.VERSION,
        "docs_url": "/docs"
    }

# Import and include routers here
# from app.api.api_v1.endpoints import auth, closet, outfit
# app.include_router(auth.router, prefix=settings.API_V1_STR)
# app.include_router(closet.router, prefix=settings.API_V1_STR)
# app.include_router(outfit.router, prefix=settings.API_V1_STR) 