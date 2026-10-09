import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, Depends

from app.database import courses_collection, registrations_collection
from app.models import CourseCreateRequest, CourseUpdateRequest
from app.utils.dependencies import get_current_user, require_role

router = APIRouter(prefix="/api/courses", tags=["Courses"])


def _serialize(course):
    course["_id"] = str(course["_id"])
    return course


@router.get("")
async def list_courses(status_filter: str = None, level: str = None, search: str = None):
    query = {}
    if status_filter:
        query["status"] = status_filter
    if level:
        query["level"] = level
    if search:
        query["title"] = {"$regex": search, "$options": "i"}

    courses = await courses_collection.find(query).to_list(length=200)

    # Attach live enrolled count
    for c in courses:
        c["enrolled_count"] = await registrations_collection.count_documents({"course_id": c["course_id"]})

    return [_serialize(c) for c in courses]


@router.get("/{course_id}")
async def get_course(course_id: str):
    course = await courses_collection.find_one({"course_id": course_id})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    course["enrolled_count"] = await registrations_collection.count_documents({"course_id": course_id})
    return _serialize(course)


@router.post("", status_code=201)
async def create_course(payload: CourseCreateRequest, current_user: dict = Depends(require_role("admin"))):
    course_id = f"CRS-{uuid.uuid4().hex[:8].upper()}"
    now = datetime.now(timezone.utc)
    doc = payload.dict()
    doc.update({
        "course_id": course_id,
        "created_at": now,
        "updated_at": now,
        "rating": 0,
        "students_enrolled": 0,
    })
    await courses_collection.insert_one(doc)
    return {"message": "Course created successfully.", "course_id": course_id}


@router.put("/{course_id}")
async def update_course(course_id: str, payload: CourseUpdateRequest, current_user: dict = Depends(require_role("admin"))):
    course = await courses_collection.find_one({"course_id": course_id})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    update_data = {k: v for k, v in payload.dict().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc)
    await courses_collection.update_one({"course_id": course_id}, {"$set": update_data})
    return {"message": "Course updated successfully."}


@router.patch("/{course_id}/status")
async def toggle_course_status(course_id: str, new_status: str, current_user: dict = Depends(require_role("admin"))):
    course = await courses_collection.find_one({"course_id": course_id})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    await courses_collection.update_one({"course_id": course_id}, {"$set": {"status": new_status}})
    return {"message": f"Course status updated to {new_status}."}


@router.delete("/{course_id}")
async def delete_course(course_id: str, current_user: dict = Depends(require_role("admin"))):
    result = await courses_collection.delete_one({"course_id": course_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"message": "Course deleted successfully."}
