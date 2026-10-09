import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, Depends

from app.database import announcements_collection
from app.models import AnnouncementCreateRequest
from app.utils.dependencies import get_current_user, require_role

router = APIRouter(prefix="/api/announcements", tags=["Announcements"])


def _serialize(a):
    a["_id"] = str(a["_id"])
    return a


@router.get("")
async def list_announcements(current_user: dict = Depends(get_current_user)):
    if current_user["role"] == "student":
        query = {"audience": {"$in": ["all_students", "course", "batch"]}}
    elif current_user["role"] == "professional":
        query = {"audience": {"$in": ["all_professionals"]}}
    else:
        query = {}
    items = await announcements_collection.find(query).sort("date", -1).to_list(200)
    return [_serialize(a) for a in items]


@router.post("", status_code=201)
async def create_announcement(payload: AnnouncementCreateRequest, current_user: dict = Depends(require_role("admin"))):
    announcement_id = f"ANN-{uuid.uuid4().hex[:8].upper()}"
    doc = payload.dict()
    doc.update({"announcement_id": announcement_id, "date": datetime.now(timezone.utc)})
    await announcements_collection.insert_one(doc)
    return {"message": "Announcement published successfully.", "announcement_id": announcement_id}


@router.delete("/{announcement_id}")
async def delete_announcement(announcement_id: str, current_user: dict = Depends(require_role("admin"))):
    result = await announcements_collection.delete_one({"announcement_id": announcement_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Announcement not found")
    return {"message": "Announcement deleted."}
