from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends

from app.database import (
    users_collection,
    courses_collection,
    registrations_collection,
    certificates_collection,
    activity_logs_collection,
)
from app.utils.dependencies import require_role

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])


@router.get("/overview")
async def overview(current_user: dict = Depends(require_role("admin"))):
    total_students = await users_collection.count_documents({"role": "student"})
    total_professionals = await users_collection.count_documents({"role": "professional"})
    total_courses = await courses_collection.count_documents({})
    total_registrations = await registrations_collection.count_documents({})
    active_users = await users_collection.count_documents({"status": "active"})
    completed_courses = await registrations_collection.count_documents({"status": "completed"})
    certificates_issued = await certificates_collection.count_documents({})

    today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    todays_logins = await activity_logs_collection.count_documents(
        {"action": "LOGIN_SUCCESS", "timestamp": {"$gte": today_start}}
    )
    failed_logins = await activity_logs_collection.count_documents({"action": "LOGIN_FAILED"})

    return {
        "total_students": total_students,
        "total_professionals": total_professionals,
        "total_courses": total_courses,
        "total_registrations": total_registrations,
        "active_users": active_users,
        "completed_courses": completed_courses,
        "certificates_issued": certificates_issued,
        "todays_logins": todays_logins,
        "failed_logins": failed_logins,
    }


@router.get("/user-growth")
async def user_growth(current_user: dict = Depends(require_role("admin")), days: int = 30):
    start_date = datetime.now(timezone.utc) - timedelta(days=days)
    pipeline = [
        {"$match": {"created_at": {"$gte": start_date}}},
        {"$group": {
            "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$created_at"}},
            "count": {"$sum": 1},
        }},
        {"$sort": {"_id": 1}},
    ]
    result = await users_collection.aggregate(pipeline).to_list(days + 1)
    return [{"date": r["_id"], "count": r["count"]} for r in result]


@router.get("/course-popularity")
async def course_popularity(current_user: dict = Depends(require_role("admin"))):
    pipeline = [
        {"$group": {"_id": "$course_name", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
    ]
    result = await registrations_collection.aggregate(pipeline).to_list(50)
    return [{"course": r["_id"], "count": r["count"]} for r in result]


@router.get("/registrations-by-status")
async def registrations_by_status(current_user: dict = Depends(require_role("admin"))):
    pipeline = [{"$group": {"_id": "$status", "count": {"$sum": 1}}}]
    result = await registrations_collection.aggregate(pipeline).to_list(20)
    return [{"status": r["_id"], "count": r["count"]} for r in result]
