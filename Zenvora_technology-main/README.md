# Zenvora Technology — Course Registration & Learning Portal

A full-stack web application for **Zenvora Technology**, a technology company and learning platform
based in Coimbatore, Tamil Nadu, India. Built with React + Vite on the frontend and FastAPI + MongoDB
on the backend, with real JWT authentication, role-based dashboards, course registration, and
activity/login tracking.

> **Tagline:** Transforming Ideas Into Powerful Digital Solutions

---

## 1. Features

- **Authentication:** JWT-based login/logout for three roles — Student, Professional, Admin. Passwords
  are hashed with bcrypt and never returned by any API.
- **Role-based dashboards:** Separate sidebar-driven dashboards and protected routes per role, enforced
  on both frontend (`ProtectedRoute`) and backend (`require_role` dependency).
- **Course marketplace:** Public course browsing, detail pages with curriculum accordion, and real
  registration flow connected to MongoDB.
- **Student dashboard:** My Courses, Browse Courses, Progress, Certificates, Announcements, Activity
  timeline, Profile with password change.
- **Professional dashboard:** Assigned courses, students, batches, learning materials, announcements,
  analytics charts, activity.
- **Admin dashboard:** Full CRUD for students, professionals, courses, registrations, batches,
  certificates, announcements. System-wide activity log viewer with filters. Analytics with Recharts
  (user growth, course popularity, registration status).
- **Login/logout activity tracking:** Every auth event (`LOGIN_SUCCESS`, `LOGIN_FAILED`, `LOGOUT`,
  `REGISTER`, `PROFILE_UPDATED`, `PASSWORD_CHANGED`, `COURSE_REGISTERED`, `CERTIFICATE_ISSUED`) is
  written to the `activity_logs` collection with IP, device and browser metadata.
- **Certificate verification:** Public `/certificate/verify/:id` page that checks a certificate's
  verification ID against the database.
- **Quantum Aurora design system:** Dark glassmorphism theme, aurora gradients, floating orbs, animated
  grid background, Framer Motion transitions — implemented with Tailwind CSS.

---

## 2. Technology Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, Axios, React Router,
Recharts, React Hook Form, Zod, React Hot Toast.

**Backend:** Python, FastAPI, Pydantic, JWT (python-jose), passlib/bcrypt, Uvicorn, Motor
(async MongoDB driver).

**Database:** MongoDB.

---

## 3. Project Structure

```
zenvora/
├── backend/
│   ├── app/
│   │   ├── main.py                # FastAPI app entrypoint
│   │   ├── config.py               # Environment configuration
│   │   ├── database.py             # MongoDB collections + indexes
│   │   ├── models.py               # Pydantic request/response schemas
│   │   ├── seed.py                 # Demo data seed script
│   │   ├── routes/                 # auth, students, professionals, courses,
│   │   │                           # registrations, batches, certificates,
│   │   │                           # announcements, activity_logs, analytics
│   │   ├── services/
│   │   │   └── activity_service.py # Activity logging + user-agent parsing
│   │   └── utils/
│   │       ├── security.py         # Password hashing + JWT
│   │       └── dependencies.py     # get_current_user, require_role
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/              # Navbar, Footer, DashboardLayout, UI primitives
    │   ├── context/AuthContext.jsx  # Global auth state
    │   ├── services/api.js          # Axios instance + all API calls
    │   ├── pages/
    │   │   ├── public/               # Home, About, Services, Courses, Login, etc.
    │   │   ├── student/               # Student dashboard pages
    │   │   ├── professional/          # Professional dashboard pages
    │   │   └── admin/                 # Admin dashboard pages
    │   ├── App.jsx                  # All routes
    │   └── main.jsx
    ├── tailwind.config.js           # Quantum Aurora theme colors
    ├── package.json
    └── .env.example
```

---

## 4. Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB running locally (`mongodb://localhost:27017`) or a MongoDB Atlas connection string

---

## 5. MongoDB Setup

**Option A — Local MongoDB:**
```bash
# macOS (Homebrew)
brew tap mongodb/brew && brew install mongodb-community && brew services start mongodb-community

# Ubuntu/Debian
sudo apt install mongodb
sudo systemctl start mongod
```

**Option B — MongoDB Atlas (cloud, free tier):**
1. Create a cluster at https://www.mongodb.com/cloud/atlas
2. Get your connection string and put it in `backend/.env` as `MONGODB_URI`

---

## 6. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt

cp .env.example .env
# Edit .env: set MONGODB_URI, JWT_SECRET (use a long random string), etc.

# Seed the database with demo accounts and sample courses
python -m app.seed

# Run the API
uvicorn app.main:app --reload --port 8000
```

The API will be running at `http://localhost:8000`.
- Swagger docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

## 7. Frontend Setup

```bash
cd frontend
npm install

cp .env.example .env
# Edit .env if your backend runs on a different URL:
# VITE_API_URL=http://localhost:8000/api

npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 8. Demo Accounts

Created by the seed script (`python -m app.seed`). **Development only — change passwords before
deploying to production.**

| Role         | Email                                  | Password      |
|--------------|-----------------------------------------|---------------|
| Admin        | admin@zenvoratechnology.com             | ChangeMe@123  |
| Professional | professional@zenvoratechnology.com      | ChangeMe@123  |
| Student      | student@zenvoratechnology.com           | ChangeMe@123  |

---

## 9. API Overview

All endpoints are prefixed with `/api`. Protected endpoints require an `Authorization: Bearer <token>`
header, obtained from `POST /api/auth/login`.

| Area | Endpoints |
|---|---|
| Auth | `POST /auth/register/student`, `POST /auth/register/professional`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`, `PUT /auth/change-password`, `POST /auth/forgot-password` |
| Courses | `GET /courses`, `GET /courses/{id}`, `POST /courses` (admin), `PUT /courses/{id}` (admin), `PATCH /courses/{id}/status` (admin), `DELETE /courses/{id}` (admin) |
| Registrations | `POST /registrations` (student), `GET /registrations/my`, `GET /registrations` (admin), `PUT /registrations/{id}` (admin/professional), `DELETE /registrations/{id}` |
| Students | `GET /students` (admin/professional), `GET /students/{id}`, `PUT /students/{id}/profile`, `PATCH /students/{id}/status` (admin), `DELETE /students/{id}` (admin) |
| Professionals | `GET /professionals` (admin), `GET /professionals/{id}`, `PUT /professionals/{id}/profile`, `POST /professionals/{id}/assign-course` (admin), `PATCH /professionals/{id}/status` (admin), `DELETE /professionals/{id}` (admin) |
| Batches | `GET /batches`, `POST /batches` (admin), `PUT /batches/{id}` (admin), `DELETE /batches/{id}` (admin) |
| Certificates | `GET /certificates/my`, `GET /certificates` (admin), `POST /certificates/issue` (admin/professional), `GET /certificates/verify/{verification_id}` (public) |
| Announcements | `GET /announcements`, `POST /announcements` (admin), `DELETE /announcements/{id}` (admin) |
| Activity Logs | `GET /activity-logs/my`, `GET /activity-logs` (admin, with filters) |
| Analytics | `GET /analytics/overview`, `GET /analytics/user-growth`, `GET /analytics/course-popularity`, `GET /analytics/registrations-by-status` (all admin) |

Full interactive documentation is available at `/docs` once the backend is running.

---

## 10. Environment Variables

**`backend/.env`**
```
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=zenvora
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRE_MINUTES=1440
FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173
```

**`frontend/.env`**
```
VITE_API_URL=http://localhost:8000/api
```

Never commit real `.env` files — only the `.env.example` templates are checked into git.

---

## 11. Deploying to Production

1. **Database:** Use MongoDB Atlas or a managed MongoDB instance. Update `MONGODB_URI`.
2. **Backend:** Deploy on Railway, Render, Fly.io, or a VPS. Set all env vars from `.env.example`,
   use a strong random `JWT_SECRET`, and set `CORS_ORIGINS` to your real frontend domain.
3. **Frontend:** Deploy on Vercel or Netlify. Set `VITE_API_URL` to your deployed backend's `/api` URL.
4. **Change all demo account passwords** (or delete the demo accounts) before going live.
5. Re-run `python -m app.seed` only in development — it wipes and reseeds collections, so **never
   run it against a production database with real user data**.

---

## 12. Pushing to GitHub

```bash
cd zenvora
git init
git add .
git commit -m "Initial commit: Zenvora Technology full-stack platform"
git branch -M main
git remote add origin https://github.com/<your-username>/zenvora-technology.git
git push -u origin main
```

A `.gitignore` is included so `node_modules/`, `venv/`, `.env`, and `__pycache__/` are excluded
automatically.

---

## 13. What's Implemented vs. What to Extend

This is a genuinely working full-stack app — every dashboard page calls real FastAPI endpoints backed
by MongoDB, not mock data. A few areas are intentionally left as lighter scaffolding you can build on:

- **Course materials upload** (Professional → Learning Materials) is wired to local state as a UI
  demo; connect it to a new `course_modules` API route + file storage (e.g. S3) for persistence.
- **Contact/quote form** submits locally with a toast; wire it to a `/api/contact` endpoint or an
  email service (e.g. Resend, SendGrid) to actually deliver enquiries.
- **Certificate PDF download** shows a button; add a PDF generation library (e.g. `reportlab` on the
  backend, or `jspdf` on the frontend) to produce a downloadable file.
- **Rate limiting** on auth endpoints is not yet implemented — consider `slowapi` for FastAPI.
- **Course progress** is currently updated only via the admin/professional registration update
  endpoint — add a "mark module complete" flow to drive it from real learning activity.

---

## 14. Support

Customer Support: +91 9025168077
WhatsApp: +91 9042938077
Email: zenvoratechnologyinfo@gmail.com
Coimbatore, Tamil Nadu, India · Mon–Fri, 9:30 AM – 6:30 PM
# Zenvora_technology
