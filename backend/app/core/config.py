from pydantic import BaseSettings
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "WearWise AI"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "wearwise")
    SQLALCHEMY_DATABASE_URI: Optional[str] = None

    @property
    def SQLALCHEMY_DATABASE_URL(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}/{self.POSTGRES_DB}"

    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # AI Model Settings
    MODEL_PATH: str = "ml/models"
    UPLOAD_FOLDER: str = "uploads"
    
    class Config:
        case_sensitive = True

settings = Settings() 