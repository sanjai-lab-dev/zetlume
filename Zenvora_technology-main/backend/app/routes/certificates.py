import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, Depends

from app.database import certificates_collection, registrations_collection, courses_collection
from app.models import CertificateIssueRequest
from app.utils.dependencies import get_current_user, require_role
from app.services.activity_service import log_activity

router = APIRouter(prefix="/api/certificates", tags=["Certificates"])


def _serialize(c):
    c["_id"] = str(c["_id"])
    return c


@router.get("/my")
async def my_certificates(current_user: dict = Depends(get_current_user)):
    certs = await certificates_collection.find({"student_id": current_user["user_id"]}).to_list(200)
    return [_serialize(c) for c in certs]


@router.get("")
async def list_certificates(current_user: dict = Depends(require_role("admin"))):
    certs = await certificates_collection.find().to_list(1000)
    return [_serialize(c) for c in certs]


@router.post("/issue", status_code=201)
async def issue_certificate(payload: CertificateIssueRequest, current_user: dict = Depends(require_role("admin", "professional"))):
    reg = await registrations_collection.find_one({"student_id": payload.student_id, "course_id": payload.course_id})
    if not reg:
        raise HTTPException(status_code=404, detail="Registration not found for this student/course")
    if reg.get("progress", 0) < 100:
        raise HTTPException(status_code=400, detail="Course must be 100% complete to issue a certificate")

    course = await courses_collection.find_one({"course_id": payload.course_id})
    certificate_id = f"CERT-{uuid.uuid4().hex[:10].upper()}"
    verification_id = uuid.uuid4().hex[:12].upper()

    doc = {
        "certificate_id": certificate_id,
        "student_id": payload.student_id,
        "student_name": reg["student_name"],
        "course_id": payload.course_id,
        "course_name": course["title"] if course else reg["course_name"],
        "completion_date": datetime.now(timezone.utc),
        "professional": current_user["name"],
        "verification_id": verification_id,
    }
    await certificates_collection.insert_one(doc)

    await log_activity(payload.student_id, "student", reg["student_name"], "CERTIFICATE_ISSUED", "success")

    return {"message": "Certificate issued successfully.", "certificate_id": certificate_id, "verification_id": verification_id}


@router.get("/verify/{verification_id}")
async def verify_certificate(verification_id: str):
    cert = await certificates_collection.find_one({"verification_id": verification_id})
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found. Please check the verification ID.")
    return _serialize(cert)
