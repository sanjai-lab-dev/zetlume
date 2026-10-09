from fastapi import APIRouter, Depends, Query

from app.database import activity_logs_collection
from app.utils.dependencies import get_current_user, require_role

router = APIRouter(prefix="/api/activity-logs", tags=["Activity Logs"])


def _serialize(log):
    log["_id"] = str(log["_id"])
    return log


@router.get("/my")
async def my_activity(current_user: dict = Depends(get_current_user)):
    logs = await activity_logs_collection.find({"user_id": current_user["user_id"]}).sort("timestamp", -1).to_list(200)
    return [_serialize(l) for l in logs]


@router.get("")
async def list_activity(
    current_user: dict = Depends(require_role("admin")),
    role: str = None,
    action: str = None,
    email: str = Query(None),
    status_filter: str = Query(None, alias="status"),
):
    query = {}
    if role:
        query["user_role"] = role
    if action:
        query["action"] = action
    if email:
        query["user_email"] = {"$regex": email, "$options": "i"}
    if status_filter:
        query["status"] = status_filter

    logs = await activity_logs_collection.find(query).sort("timestamp", -1).to_list(1000)
    return [_serialize(l) for l in logs]
