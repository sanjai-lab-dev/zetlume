from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

client = AsyncIOMotorClient(settings.MONGODB_URI)
db = client[settings.DATABASE_NAME]

# Collections
users_collection = db["users"]
student_profiles_collection = db["student_profiles"]
professional_profiles_collection = db["professional_profiles"]
courses_collection = db["courses"]
course_modules_collection = db["course_modules"]
registrations_collection = db["registrations"]
batches_collection = db["batches"]
certificates_collection = db["certificates"]
announcements_collection = db["announcements"]
activity_logs_collection = db["activity_logs"]
notifications_collection = db["notifications"]
settings_collection = db["settings"]


async def create_indexes():
    """Create unique/lookup indexes. Called once on app startup."""
    await users_collection.create_index("email", unique=True)
    await users_collection.create_index("user_id", unique=True)
    await courses_collection.create_index("course_id", unique=True)
    await registrations_collection.create_index("registration_id", unique=True)
    await activity_logs_collection.create_index("timestamp")
    await activity_logs_collection.create_index("user_id")
