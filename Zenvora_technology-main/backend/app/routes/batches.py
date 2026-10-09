import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, Depends

from app.database import batches_collection, courses_collection
from app.models import BatchCreateRequest
from app.utils.dependencies import get_current_user, require_role

router = APIRouter(prefix="/api/batches", tags=["Batches"])


def _serialize(b):
    b["_id"] = str(b["_id"])
    return b


@router.get("")
async def list_batches(current_user: dict = Depends(get_current_user)):
    query = {}
    if current_user["role"] == "professional":
        query["professional_id"] = current_user["user_id"]
    batches = await batches_collection.find(query).to_list(500)
    return [_serialize(b) for b in batches]


@router.post("", status_code=201)
async def create_batch(payload: BatchCreateRequest, current_user: dict = Depends(require_role("admin"))):
    course = await courses_collection.find_one({"course_id": payload.course_id})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    batch_id = f"BATCH-{uuid.uuid4().hex[:8].upper()}"
    doc = payload.dict()
    doc.update({"batch_id": batch_id, "created_at": datetime.now(timezone.utc), "current_students": 0})
    await batches_collection.insert_one(doc)
    return {"message": "Batch created successfully.", "batch_id": batch_id}


@router.put("/{batch_id}")
async def update_batch(batch_id: str, payload: BatchCreateRequest, current_user: dict = Depends(require_role("admin"))):
    result = await batches_collection.update_one({"batch_id": batch_id}, {"$set": payload.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Batch not found")
    return {"message": "Batch updated successfully."}


@router.delete("/{batch_id}")
async def delete_batch(batch_id: str, current_user: dict = Depends(require_role("admin"))):
    result = await batches_collection.delete_one({"batch_id": batch_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Batch not found")
    return {"message": "Batch deleted successfully."}
