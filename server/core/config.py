import os
from pydantic_settings import BaseSettings  # NEW
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    APP_NAME: str = "Hire Genie API"
    APP_VERSION: str = "0.1.0"
    APP_DESCRIPTION: str = "AI-Powered Recruitment Platform"
    APP_ENV: str = os.getenv("APP_ENV", "development")

    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    DATABASE_URL: str = os.getenv("DATABASE_URL")

    CORS_ORIGINS: list = ["http://localhost:3000"]

    class Config:
        case_sensitive = True


settings = Settings()
