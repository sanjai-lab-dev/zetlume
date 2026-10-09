import uuid
from datetime import datetime, timezone
from typing import Optional

from app.database import activity_logs_collection


async def log_activity(
    user_id: str,
    user_role: str,
    user_email: str,
    action: str,
    status: str = "success",
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None,
    device: Optional[str] = None,
    browser: Optional[str] = None,
    details: Optional[str] = None,
):
    """Create an activity log entry. Called on every auth/course/profile event."""
    log_entry = {
        "log_id": str(uuid.uuid4()),
        "user_id": user_id,
        "user_role": user_role,
        "user_email": user_email,
        "action": action,
        "status": status,
        "timestamp": datetime.now(timezone.utc),
        "ip_address": ip_address,
        "user_agent": user_agent,
        "device": device,
        "browser": browser,
        "details": details,
    }
    await activity_logs_collection.insert_one(log_entry)
    return log_entry


def parse_user_agent(user_agent: str) -> dict:
    """Very lightweight UA parsing without extra dependencies."""
    if not user_agent:
        return {"device": "Unknown", "browser": "Unknown"}

    ua = user_agent.lower()
    if "mobile" in ua or "android" in ua or "iphone" in ua:
        device = "Mobile"
    elif "tablet" in ua or "ipad" in ua:
        device = "Tablet"
    else:
        device = "Desktop"

    if "edg" in ua:
        browser = "Edge"
    elif "chrome" in ua:
        browser = "Chrome"
    elif "firefox" in ua:
        browser = "Firefox"
    elif "safari" in ua:
        browser = "Safari"
    else:
        browser = "Other"

    return {"device": device, "browser": browser}
