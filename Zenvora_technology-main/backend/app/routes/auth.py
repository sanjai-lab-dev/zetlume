import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, status, Depends, Request

from app.database import (
    users_collection,
    student_profiles_collection,
    professional_profiles_collection,
)
from app.models import (
    StudentRegisterRequest,
    ProfessionalRegisterRequest,
    LoginRequest,
    ChangePasswordRequest,
    ProfilePhotoRequest,
)
from app.utils.security import hash_password, verify_password, create_access_token
from app.utils.dependencies import get_current_user
from app.services.activity_service import log_activity, parse_user_agent

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


def _client_meta(request: Request):
    ip = request.client.host if request.client else None
    ua = request.headers.get("user-agent", "")
    parsed = parse_user_agent(ua)
    return ip, ua, parsed["device"], parsed["browser"]


@router.post("/register/student", status_code=status.HTTP_201_CREATED)
async def register_student(payload: StudentRegisterRequest, request: Request):
    existing = await users_collection.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists")

    user_id = f"STU-{uuid.uuid4().hex[:8].upper()}"
    now = datetime.now(timezone.utc)

    user_doc = {
        "user_id": user_id,
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "password_hash": hash_password(payload.password),
        "role": "student",
        "status": "active",
        "profile_image": None,
        "created_at": now,
        "updated_at": now,
        "last_login": None,
    }
    await users_collection.insert_one(user_doc)

    profile_doc = {
        "user_id": user_id,
        "date_of_birth": payload.date_of_birth,
        "gender": payload.gender,
        "college": payload.college,
        "degree": payload.degree,
        "department": payload.department,
        "year_of_study": payload.year_of_study,
        "address": payload.address,
        "bio": "",
    }
    await student_profiles_collection.insert_one(profile_doc)

    ip, ua, device, browser = _client_meta(request)
    await log_activity(user_id, "student", payload.email, "REGISTER", "success", ip, ua, device, browser)

    return {"message": "Account created successfully.", "user_id": user_id}


@router.post("/register/professional", status_code=status.HTTP_201_CREATED)
async def register_professional(payload: ProfessionalRegisterRequest, request: Request):
    existing = await users_collection.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists")

    user_id = f"PRO-{uuid.uuid4().hex[:8].upper()}"
    now = datetime.now(timezone.utc)

    user_doc = {
        "user_id": user_id,
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "password_hash": hash_password(payload.password),
        "role": "professional",
        "status": "active",
        "profile_image": None,
        "created_at": now,
        "updated_at": now,
        "last_login": None,
    }
    await users_collection.insert_one(user_doc)

    profile_doc = {
        "user_id": user_id,
        "designation": payload.designation,
        "specialization": payload.specialization,
        "experience_years": payload.experience_years,
        "assigned_courses": [],
        "bio": "",
    }
    await professional_profiles_collection.insert_one(profile_doc)

    ip, ua, device, browser = _client_meta(request)
    await log_activity(user_id, "professional", payload.email, "REGISTER", "success", ip, ua, device, browser)

    return {"message": "Account created successfully.", "user_id": user_id}


@router.post("/login")
async def login(payload: LoginRequest, request: Request):
    ip, ua, device, browser = _client_meta(request)
    user = await users_collection.find_one({"email": payload.email})

    if not user or not verify_password(payload.password, user["password_hash"]):
        # Log failed attempt if we know the user
        if user:
            await log_activity(
                user["user_id"], user["role"], payload.email, "LOGIN_FAILED", "failed", ip, ua, device, browser
            )
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if user.get("status") == "inactive":
        await log_activity(
            user["user_id"], user["role"], payload.email, "LOGIN_FAILED", "failed", ip, ua, device, browser,
            details="Account deactivated",
        )
        raise HTTPException(status_code=403, detail="Your account has been deactivated. Contact support.")

    await users_collection.update_one(
        {"user_id": user["user_id"]}, {"$set": {"last_login": datetime.now(timezone.utc)}}
    )

    token = create_access_token({"user_id": user["user_id"], "role": user["role"]})

    await log_activity(
        user["user_id"], user["role"], user["email"], "LOGIN_SUCCESS", "success", ip, ua, device, browser
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "user_id": user["user_id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "profile_image": user.get("profile_image"),
        },
    }


@router.post("/logout")
async def logout(request: Request, current_user: dict = Depends(get_current_user)):
    ip, ua, device, browser = _client_meta(request)
    await log_activity(
        current_user["user_id"], current_user["role"], current_user["email"],
        "LOGOUT", "success", ip, ua, device, browser,
    )
    return {"message": "Logged out successfully."}


@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    profile = None
    if current_user["role"] == "student":
        profile = await student_profiles_collection.find_one({"user_id": current_user["user_id"]})
    elif current_user["role"] == "professional":
        profile = await professional_profiles_collection.find_one({"user_id": current_user["user_id"]})
    if profile:
        profile["_id"] = str(profile["_id"])
    return {"user": current_user, "profile": profile}


@router.put("/change-password")
async def change_password(payload: ChangePasswordRequest, request: Request, current_user: dict = Depends(get_current_user)):
    user = await users_collection.find_one({"user_id": current_user["user_id"]})
    if not verify_password(payload.current_password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect")

    await users_collection.update_one(
        {"user_id": current_user["user_id"]},
        {"$set": {"password_hash": hash_password(payload.new_password), "updated_at": datetime.now(timezone.utc)}},
    )

    ip, ua, device, browser = _client_meta(request)
    await log_activity(
        current_user["user_id"], current_user["role"], current_user["email"],
        "PASSWORD_CHANGED", "success", ip, ua, device, browser,
    )
    return {"message": "Password changed successfully."}


@router.post("/forgot-password")
async def forgot_password(email: str):
    """Stub: in production this sends a reset email with a signed token.
    Kept as a real endpoint so the frontend flow works end-to-end without exposing user existence."""
    user = await users_collection.find_one({"email": email})
    # Always return the same message to avoid leaking which emails are registered
    return {"message": "If an account with that email exists, a password reset link has been sent."}


@router.put("/profile-photo")
async def update_profile_photo(payload: ProfilePhotoRequest, current_user: dict = Depends(get_current_user)):
    """Stores a small base64 data URI directly on the user document. The frontend
    resizes/compresses images client-side before sending them here. This keeps
    the implementation dependency-free, but for a production deployment with many
    users, swap this for real object storage (S3, Cloudinary, etc.) and store a URL
    instead of the raw image data."""
    if not payload.image_base64.startswith("data:image/"):
        raise HTTPException(status_code=400, detail="Invalid image format")

    await users_collection.update_one(
        {"user_id": current_user["user_id"]},
        {"$set": {"profile_image": payload.image_base64, "updated_at": datetime.now(timezone.utc)}},
    )
    return {"message": "Profile photo updated successfully."}
