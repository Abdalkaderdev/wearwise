from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models import ClothingItem, ClothesDB, UserDB
from app.database import get_db
from jose import jwt, JWTError
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Helper to get current user from JWT

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

@router.post("/upload-clothes", response_model=ClothingItem)
def upload_clothes(
    file: UploadFile = File(...),
    description: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    color: Optional[str] = Form(None),
    current_user: UserDB = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Save file locally (simulate Cloudinary/local storage)
    file_location = f"uploads/{current_user.id}_{file.filename}"
    with open(file_location, "wb") as buffer:
        buffer.write(file.file.read())
    image_url = f"/{file_location}"
    db_clothes = ClothesDB(
        user_id=current_user.id,
        image_url=image_url,
        description=description,
        category=category,
        color=color
    )
    db.add(db_clothes)
    db.commit()
    db.refresh(db_clothes)
    return db_clothes

@router.get("/my-closet", response_model=List[ClothingItem])
def my_closet(current_user: UserDB = Depends(get_current_user), db: Session = Depends(get_db)):
    clothes = db.query(ClothesDB).filter(ClothesDB.user_id == current_user.id).all()
    return clothes 