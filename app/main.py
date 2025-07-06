from fastapi import FastAPI
from dotenv import load_dotenv
import os
from app.routers import auth, closet, outfit

load_dotenv()

app = FastAPI()

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(closet.router, prefix="/closet", tags=["closet"])
app.include_router(outfit.router, prefix="/outfit", tags=["outfit"])

@app.get("/")
def read_root():
    return {"message": "Welcome to WearWise API!"} 