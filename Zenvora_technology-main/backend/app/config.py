import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    MONGODB_URI: str = os.getenv("MONGODB_URI")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "zenvora")

    JWT_SECRET: str = os.getenv(
        "JWT_SECRET",
        "change-this-secret-in-production"
    )

    JWT_ALGORITHM: str = "HS256"

    JWT_EXPIRE_MINUTES: int = int(
        os.getenv("JWT_EXPIRE_MINUTES", "1440")
    )

    FRONTEND_URL: str = os.getenv(
        "FRONTEND_URL",
        "http://localhost:5173"
    )

    CORS_ORIGINS: list = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173"
    ).split(",")


settings = Settings()