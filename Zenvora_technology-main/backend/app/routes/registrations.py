import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, Depends, Request

from app.database import registrations_collection, courses_collection, users_collection
from app.models import RegistrationCreateRequest, RegistrationUpdateRequest, ModuleCompleteRequest
from app.utils.dependencies import get_current_user, require_role
from app.services.activity_service import log_activity, parse_user_agent

router = APIRouter(prefix="/api/registrations", tags=["Registrations"])


def _serialize(reg):
    reg["_id"] = str(reg["_id"])
    return reg


@router.post("", status_code=201)
async def create_registration(payload: RegistrationCreateRequest, request: Request, current_user: dict = Depends(require_role("student"))):
    course = await courses_collection.find_one({"course_id": payload.course_id})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    existing = await registrations_collection.find_one({
        "student_id": current_user["user_id"], "course_id": payload.course_id, "status": {"$ne": "cancelled"}
    })
    if existing:
        raise HTTPException(status_code=400, detail="You are already registered for this course")

    registration_id = f"REG-{uuid.uuid4().hex[:8].upper()}"
    now = datetime.now(timezone.utc)
    doc = {
        "registration_id": registration_id,
        "student_id": current_user["user_id"],
        "student_name": current_user["name"],
        "course_id": payload.course_id,
        "course_name": course["title"],
        "registration_date": now,
        "status": "pending",
        "payment_status": "pending",
        "batch_id": payload.batch_id,
        "assigned_professional_id": None,
        "progress": 0,
        "completed_modules": [],
    }
    await registrations_collection.insert_one(doc)

    ua = request.headers.get("user-agent", "")
    parsed = parse_user_agent(ua)
    await log_activity(
        current_user["user_id"], "student", current_user["email"], "COURSE_REGISTERED", "success",
        request.client.host if request.client else None, ua, parsed["device"], parsed["browser"],
        details=f"Registered for {course['title']}",
    )

    return {"message": "Registration successful.", "registration_id": registration_id}


@router.get("/my")
async def my_registrations(current_user: dict = Depends(get_current_user)):
    if current_user["role"] == "student":
        regs = await registrations_collection.find({"student_id": current_user["user_id"]}).to_list(200)
    elif current_user["role"] == "professional":
        regs = await registrations_collection.find({"assigned_professional_id": current_user["user_id"]}).to_list(200)
    else:
        raise HTTPException(status_code=403, detail="Not applicable for this role")
    return [_serialize(r) for r in regs]


@router.get("")
async def list_registrations(current_user: dict = Depends(require_role("admin"))):
    regs = await registrations_collection.find().sort("registration_date", -1).to_list(500)
    return [_serialize(r) for r in regs]


@router.put("/{registration_id}")
async def update_registration(registration_id: str, payload: RegistrationUpdateRequest, current_user: dict = Depends(require_role("admin", "professional"))):
    reg = await registrations_collection.find_one({"registration_id": registration_id})
    if not reg:
        raise HTTPException(status_code=404, detail="Registration not found")

    update_data = {k: v for k, v in payload.dict().items() if v is not None}
    await registrations_collection.update_one({"registration_id": registration_id}, {"$set": update_data})
    return {"message": "Registration updated successfully."}


@router.delete("/{registration_id}")
async def cancel_registration(registration_id: str, current_user: dict = Depends(get_current_user)):
    reg = await registrations_collection.find_one({"registration_id": registration_id})
    if not reg:
        raise HTTPException(status_code=404, detail="Registration not found")
    if current_user["role"] == "student" and reg["student_id"] != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    await registrations_collection.update_one({"registration_id": registration_id}, {"$set": {"status": "cancelled"}})
    return {"message": "Registration cancelled."}


@router.post("/{registration_id}/submit-payment")
async def submit_payment(registration_id: str, request: Request, current_user: dict = Depends(require_role("student"))):
    """Student confirms they've completed payment via the QR code. This does NOT verify
    the payment automatically — it flags the registration for manual review by an admin,
    who confirms the amount landed before marking payment_status as 'paid' and unlocking modules."""
    reg = await registrations_collection.find_one({"registration_id": registration_id})
    if not reg:
        raise HTTPException(status_code=404, detail="Registration not found")
    if reg["student_id"] != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    if reg["payment_status"] == "paid":
        raise HTTPException(status_code=400, detail="Payment already confirmed for this course")

    await registrations_collection.update_one(
        {"registration_id": registration_id}, {"$set": {"payment_status": "pending_verification"}}
    )

    ua = request.headers.get("user-agent", "")
    parsed = parse_user_agent(ua)
    await log_activity(
        current_user["user_id"], "student", current_user["email"], "PAYMENT_SUBMITTED", "success",
        request.client.host if request.client else None, ua, parsed["device"], parsed["browser"],
        details=f"Submitted payment confirmation for {reg['course_name']}",
    )
    return {"message": "Payment submitted. Your course will unlock once an admin verifies it — usually within 24 hours."}


@router.post("/{registration_id}/complete-module")
async def complete_module(registration_id: str, payload: ModuleCompleteRequest, request: Request, current_user: dict = Depends(require_role("student"))):
    reg = await registrations_collection.find_one({"registration_id": registration_id})
    if not reg:
        raise HTTPException(status_code=404, detail="Registration not found")
    if reg["student_id"] != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    if reg["payment_status"] != "paid":
        raise HTTPException(status_code=403, detail="Complete payment to unlock course modules")

    course = await courses_collection.find_one({"course_id": reg["course_id"]})
    total_modules = len(course.get("syllabus", [])) if course else 0
    if total_modules == 0:
        raise HTTPException(status_code=400, detail="This course has no modules configured")
    if payload.module_number < 1 or payload.module_number > total_modules:
        raise HTTPException(status_code=400, detail="Invalid module number")

    completed = set(reg.get("completed_modules", []))

    # Sequential unlock: a module can only be completed once every module before it is done.
    if payload.module_number > 1 and (payload.module_number - 1) not in completed:
        raise HTTPException(status_code=400, detail="Complete the previous module first")

    completed.add(payload.module_number)
    new_progress = round(len(completed) / total_modules * 100)
    new_status = "completed" if new_progress >= 100 else "active"

    await registrations_collection.update_one(
        {"registration_id": registration_id},
        {"$set": {"completed_modules": sorted(completed), "progress": new_progress, "status": new_status}},
    )

    ua = request.headers.get("user-agent", "")
    parsed = parse_user_agent(ua)
    await log_activity(
        current_user["user_id"], "student", current_user["email"], "MODULE_COMPLETED", "success",
        request.client.host if request.client else None, ua, parsed["device"], parsed["browser"],
        details=f"Completed module {payload.module_number} of {reg['course_name']}",
    )

    return {"message": "Module marked complete.", "progress": new_progress, "completed_modules": sorted(completed)}
