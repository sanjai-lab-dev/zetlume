from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, Depends, Request

from app.database import users_collection, professional_profiles_collection, courses_collection
from app.models import ProfileUpdateRequest
from app.utils.dependencies import get_current_user, require_role
from app.services.activity_service import log_activity, parse_user_agent

router = APIRouter(prefix="/api/professionals", tags=["Professionals"])


def _public_user(u):
    u["_id"] = str(u["_id"])
    u.pop("password_hash", None)
    return u


@router.get("")
async def list_professionals(current_user: dict = Depends(require_role("admin"))):
    pros = await users_collection.find({"role": "professional"}).to_list(1000)
    return [_public_user(p) for p in pros]


@router.get("/{user_id}")
async def get_professional(user_id: str, current_user: dict = Depends(get_current_user)):
    pro = await users_collection.find_one({"user_id": user_id, "role": "professional"})
    if not pro:
        raise HTTPException(status_code=404, detail="Professional not found")
    profile = await professional_profiles_collection.find_one({"user_id": user_id})
    if profile:
        profile["_id"] = str(profile["_id"])
    return {"user": _public_user(pro), "profile": profile}


@router.put("/{user_id}/profile")
async def update_professional_profile(user_id: str, payload: ProfileUpdateRequest, request: Request, current_user: dict = Depends(get_current_user)):
    if current_user["user_id"] != user_id and current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    data = payload.dict(exclude_unset=True)
    user_fields = {k: data[k] for k in ("name", "phone") if k in data}
    profile_fields = {k: data[k] for k in ("bio", "designation", "specialization") if k in data}

    if user_fields:
        user_fields["updated_at"] = datetime.now(timezone.utc)
        await users_collection.update_one({"user_id": user_id}, {"$set": user_fields})
    if profile_fields:
        await professional_profiles_collection.update_one({"user_id": user_id}, {"$set": profile_fields})

    ua = request.headers.get("user-agent", "")
    parsed = parse_user_agent(ua)
    await log_activity(
        current_user["user_id"], current_user["role"], current_user["email"], "PROFILE_UPDATED", "success",
        request.client.host if request.client else None, ua, parsed["device"], parsed["browser"],
    )
    return {"message": "Profile updated successfully."}


@router.post("/{user_id}/assign-course")
async def assign_course(user_id: str, course_id: str, current_user: dict = Depends(require_role("admin"))):
    pro = await users_collection.find_one({"user_id": user_id, "role": "professional"})
    if not pro:
        raise HTTPException(status_code=404, detail="Professional not found")
    course = await courses_collection.find_one({"course_id": course_id})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    await professional_profiles_collection.update_one(
        {"user_id": user_id}, {"$addToSet": {"assigned_courses": course_id}}
    )
    return {"message": f"{course['title']} assigned successfully."}


@router.patch("/{user_id}/status")
async def set_professional_status(user_id: str, new_status: str, current_user: dict = Depends(require_role("admin"))):
    result = await users_collection.update_one({"user_id": user_id, "role": "professional"}, {"$set": {"status": new_status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Professional not found")
    return {"message": f"Professional status updated to {new_status}."}


@router.delete("/{user_id}")
async def delete_professional(user_id: str, current_user: dict = Depends(require_role("admin"))):
    result = await users_collection.delete_one({"user_id": user_id, "role": "professional"})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Professional not found")
    await professional_profiles_collection.delete_one({"user_id": user_id})
    return {"message": "Professional deleted successfully."}
