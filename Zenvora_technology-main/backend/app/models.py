from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field


# ---------- AUTH ----------

class StudentRegisterRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str = Field(min_length=6)
    date_of_birth: Optional[str] = None
    gender: Optional[str] = None
    college: Optional[str] = None
    degree: Optional[str] = None
    department: Optional[str] = None
    year_of_study: Optional[str] = None
    address: Optional[str] = None


class ProfessionalRegisterRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str = Field(min_length=6)
    designation: Optional[str] = None
    specialization: Optional[str] = None
    experience_years: Optional[int] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str = Field(min_length=6)


class ProfileUpdateRequest(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None
    college: Optional[str] = None
    degree: Optional[str] = None
    department: Optional[str] = None
    year_of_study: Optional[str] = None
    address: Optional[str] = None
    designation: Optional[str] = None
    specialization: Optional[str] = None


class ProfilePhotoRequest(BaseModel):
    # Small base64 data URI (e.g. "data:image/jpeg;base64,...."). The frontend
    # resizes/compresses the image client-side before sending it, since this
    # is stored directly on the user document rather than in object storage.
    image_base64: str = Field(max_length=2_000_000)


# ---------- COURSE ----------

class CourseCreateRequest(BaseModel):
    title: str
    description: str
    price: float
    duration: str
    level: str
    technology: List[str] = []
    topics: List[str] = []
    syllabus: List[str] = []
    learning_outcomes: List[str] = []
    instructor: Optional[str] = None
    status: str = "active"


class CourseUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    duration: Optional[str] = None
    level: Optional[str] = None
    technology: Optional[List[str]] = None
    topics: Optional[List[str]] = None
    syllabus: Optional[List[str]] = None
    learning_outcomes: Optional[List[str]] = None
    instructor: Optional[str] = None
    status: Optional[str] = None


# ---------- REGISTRATION ----------

class RegistrationCreateRequest(BaseModel):
    course_id: str
    batch_id: Optional[str] = None


class RegistrationUpdateRequest(BaseModel):
    status: Optional[str] = None
    payment_status: Optional[str] = None
    batch_id: Optional[str] = None
    assigned_professional_id: Optional[str] = None
    progress: Optional[float] = None


class ModuleCompleteRequest(BaseModel):
    module_number: int = Field(ge=1)


# ---------- BATCH ----------

class BatchCreateRequest(BaseModel):
    batch_name: str
    course_id: str
    professional_id: Optional[str] = None
    start_date: str
    end_date: str
    schedule: Optional[str] = None
    max_students: int = 30
    status: str = "upcoming"


# ---------- ANNOUNCEMENT ----------

class AnnouncementCreateRequest(BaseModel):
    title: str
    message: str
    audience: str = "all_students"  # all_students, all_professionals, course, batch
    target_id: Optional[str] = None
    priority: str = "normal"


# ---------- CERTIFICATE ----------

class CertificateIssueRequest(BaseModel):
    student_id: str
    course_id: str
