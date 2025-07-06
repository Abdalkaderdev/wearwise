from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.models import OutfitRequest, OutfitGenerateRequest, OutfitGenerateResponse, UserDB
from jose import jwt, JWTError
import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from app.database import get_db

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication")
        user = db.query(UserDB).filter(UserDB.username == username).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication")

@router.post("/generate")
def generate_outfit(request: OutfitRequest, user_email: str = Depends(get_current_user)):
    # Dummy AI logic
    return {"outfit": ["shirt", "pants", "shoes"], "message": "Outfit generated for user."}

@router.post("/generate-outfit", response_model=OutfitGenerateResponse)
def generate_outfit(
    request: OutfitGenerateRequest,
    current_user: UserDB = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Here you could fetch clothes from DB and use AI later
    suggestion = f"Fake outfit for user {current_user.username} with clothes {request.clothes_ids}, event: {request.event}, season: {request.season}"
    return OutfitGenerateResponse(suggestion=suggestion) 