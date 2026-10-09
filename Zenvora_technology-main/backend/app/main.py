from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import create_indexes
from app.routes import (
    auth,
    students,
    professionals,
    courses,
    registrations,
    batches,
    certificates,
    announcements,
    activity_logs,
    analytics,
)

app = FastAPI(
    title="Zenvora Technology API",
    description="Backend API for Zenvora Technology's course registration and learning portal. "
                 "Handles authentication, role-based dashboards, course registration, activity "
                 "tracking, certificates and analytics.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(students.router)
app.include_router(professionals.router)
app.include_router(courses.router)
app.include_router(registrations.router)
app.include_router(batches.router)
app.include_router(certificates.router)
app.include_router(announcements.router)
app.include_router(activity_logs.router)
app.include_router(analytics.router)


@app.on_event("startup")
async def startup_event():
    await create_indexes()


@app.get("/")
async def root():
    return {
        "message": "Zenvora Technology API is running.",
        "docs": "/docs",
        "redoc": "/redoc",
    }


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
