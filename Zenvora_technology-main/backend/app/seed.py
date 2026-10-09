"""
Seed script for Zenvora Technology database.
Run with: python -m app.seed
Populates demo accounts, sample courses, registrations, batches, announcements and activity logs
so the dashboards look populated during development.

IMPORTANT: The demo accounts use a known password (ChangeMe@123) and are for development only.
Change or remove them before deploying to production.
"""
import asyncio
import uuid
from datetime import datetime, timedelta, timezone

from app.database import (
    users_collection,
    student_profiles_collection,
    professional_profiles_collection,
    courses_collection,
    registrations_collection,
    batches_collection,
    announcements_collection,
    activity_logs_collection,
    certificates_collection,
    create_indexes,
)
from app.utils.security import hash_password

DEMO_PASSWORD = "ChangeMe@123"

COURSES = [
    {
        "title": "Full Stack Development",
        "description": "Become a job-ready full stack developer building real projects with React, Node.js and MongoDB.",
        "price": 999,
        "duration": "12 weeks",
        "level": "Beginner to Advanced",
        "technology": ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
        "topics": ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git", "GitHub"],
        "syllabus": [
            "Web Foundations — HTML5 structure, CSS3 styling and layout, responsive design basics",
            "JavaScript Deep Dive — Variables, functions, DOM manipulation, async/await, ES6+ features",
            "React & Component Design — Components, props, state, hooks, routing with React Router",
            "Node.js & REST APIs — Express.js, middleware, building and testing REST endpoints",
            "MongoDB & Data Modeling — Collections, schemas, CRUD operations, Mongoose basics",
            "Authentication & Deployment — JWT auth, environment config, deploying to production",
            "Capstone Build — Bring everything together into one complete, working full-stack application from scratch; your trainer will assign the exact brief and guide you through each stage",
        ],
        "learning_outcomes": ["Build responsive UIs", "Design REST APIs", "Work with NoSQL databases", "Deploy full stack apps"],
        "instructor": "Zenvora Faculty",
    },
    {
        "title": "Cyber Security",
        "description": "Learn practical ethical hacking, network defense and security operations from the ground up.",
        "price": 999,
        "duration": "10 weeks",
        "level": "Beginner to Intermediate",
        "technology": ["Networking", "Linux", "OWASP"],
        "topics": ["Networking", "Linux", "Ethical Hacking", "Web Security", "SOC", "SIEM", "OWASP"],
        "syllabus": [
            "Networking Fundamentals — TCP/IP, DNS, ports, protocols and how data moves across networks",
            "Linux for Security — Command line essentials, permissions, processes, and services",
            "Ethical Hacking Basics — Reconnaissance, scanning, and the ethical hacking methodology",
            "Web App Security — OWASP Top 10, common vulnerabilities, and secure coding principles",
            "SOC & SIEM Operations — Monitoring, log analysis, and incident response workflows",
            "Cryptography & Access Control — Encryption basics, hashing, authentication and authorization",
            "Capstone Assessment — Carry out a guided security assessment end-to-end and document your findings; your trainer will assign the exact scope and guide you through it",
        ],
        "learning_outcomes": ["Identify vulnerabilities", "Perform basic penetration tests", "Understand SOC workflows"],
        "instructor": "Zenvora Faculty",
    },
    {
        "title": "30-Day Ethical Hacking & Cybersecurity Course",
        "description": (
            "An intensive, hands-on program covering ethical hacking and cybersecurity fundamentals "
            "through real-world labs, industry-standard tools, and a final capstone project. Gain real-world "
            "skills and help build a safer digital future — no prior experience required, just a willingness to learn."
        ),
        "price": 999,
        "duration": "30 Days",
        "level": "Beginner to Advanced",
        "technology": ["Kali Linux", "Nmap", "Wireshark", "Burp Suite", "OWASP ZAP", "Metasploit", "Hashcat", "John the Ripper", "Gobuster", "Nikto"],
        "topics": ["Ethical Hacking", "Networking", "Linux", "Web Security", "VAPT", "Cryptography"],
        "syllabus": [
            "Cybersecurity Fundamentals — Threats, CIA triad, ethics, and legal aspects",
            "Networking Fundamentals — TCP/IP, DNS, DHCP, HTTP/HTTPS, firewalls, VPNs",
            "Linux for Ethical Hacking — Commands, permissions, processes, services, Kali Linux",
            "Reconnaissance & Information Gathering — OSINT, DNS, subdomain enumeration, WHOIS, search techniques",
            "Scanning & Enumeration — Nmap, port scanning, service enumeration, vulnerability scanning",
            "Network Security Testing — Wireshark, packet analysis, IDS/IPS, firewall security",
            "Web Application Security — OWASP Top 10, SQL Injection, XSS, CSRF, Burp Suite",
            "Password & Cryptography Security — Hashing, encryption, brute force, Hashcat, John the Ripper",
            "Exploitation & Post-Exploitation — Metasploit, privilege escalation, persistence",
            "Wireless & Social Engineering — Wi-Fi security, phishing, social engineering concepts",
            "Vulnerability Assessment & Penetration Testing — VAPT methodology, reporting, remediation",
            "Capstone Build — Build a complete vulnerable web app, find and fix vulnerabilities, and generate a full report; your trainer will assign the exact brief and guide you through it",
        ],
        "learning_outcomes": [
            "Strong understanding of ethical hacking and cybersecurity",
            "Hands-on experience with industry-standard tools",
            "A complete project with documentation and report",
            "Certificate of completion from Zenvora Technology",
            "Job-ready for roles like Security Analyst, SOC Analyst, and Penetration Tester",
        ],
        "instructor": "Zenvora Faculty",
    },
    {
        "title": "AI & Machine Learning",
        "description": "Go from Python fundamentals to building and deploying machine learning and generative AI models.",
        "price": 999,
        "duration": "12 weeks",
        "level": "Intermediate",
        "technology": ["Python", "NumPy", "Pandas"],
        "topics": ["Python", "NumPy", "Pandas", "Machine Learning", "Deep Learning", "Generative AI"],
        "syllabus": [
            "Python for AI — Core syntax, data structures, functions, and writing clean scripts",
            "Data Handling with Pandas — Loading, cleaning, and transforming real-world datasets",
            "Data Visualization — Exploring data visually with Matplotlib and Seaborn",
            "Machine Learning Algorithms — Regression, classification, clustering, and model evaluation",
            "Deep Learning Foundations — Neural networks, layers, activation functions, and training basics",
            "Generative AI Applications — Working with pretrained models and prompt-driven applications",
            "Capstone Build — Design and train a complete model to solve a real problem end-to-end; your trainer will assign the exact brief and guide you through it",
        ],
        "learning_outcomes": ["Train ML models", "Understand neural networks", "Build AI-powered applications"],
        "instructor": "Zenvora Faculty",
    },
    {
        "title": "Cloud & DevOps",
        "description": "Master cloud infrastructure and DevOps pipelines using AWS, Docker, Kubernetes and CI/CD.",
        "price": 999,
        "duration": "10 weeks",
        "level": "Intermediate",
        "technology": ["AWS", "Docker", "Kubernetes"],
        "topics": ["AWS", "Azure", "Linux", "Docker", "Kubernetes", "CI/CD", "Terraform"],
        "syllabus": [
            "Cloud Fundamentals — Core concepts across AWS and Azure, compute, storage, and networking",
            "Linux & Shell Scripting — Server administration basics for cloud environments",
            "Containers with Docker — Building images, running containers, and managing volumes",
            "Orchestration with Kubernetes — Pods, deployments, services, and scaling applications",
            "CI/CD Pipelines — Automating build, test, and deploy workflows",
            "Infrastructure as Code — Provisioning cloud resources with Terraform",
            "Capstone Deployment — Design and deploy a complete CI/CD pipeline for a real application; your trainer will assign the exact brief and guide you through it",
        ],
        "learning_outcomes": ["Deploy containerized apps", "Automate CI/CD", "Manage cloud infrastructure"],
        "instructor": "Zenvora Faculty",
    },
    {
        "title": "Data Science & Analytics",
        "description": "Learn to extract insights from data using Python, SQL, Excel and Power BI.",
        "price": 999,
        "duration": "10 weeks",
        "level": "Beginner to Intermediate",
        "technology": ["Python", "SQL", "Power BI"],
        "topics": ["Python", "SQL", "Excel", "Power BI", "Statistics", "Data Visualization"],
        "syllabus": [
            "Statistics Foundations — Descriptive statistics, probability, and distributions",
            "SQL for Analysts — Querying, joins, aggregations, and working with relational data",
            "Excel for Data Analysis — Pivot tables, formulas, and quick data exploration",
            "Python for Data Analysis — Pandas and NumPy for cleaning and analyzing datasets",
            "Power BI Dashboards — Building interactive reports and visualizations",
            "Data Storytelling — Communicating insights clearly to technical and non-technical audiences",
            "Capstone Analysis — Analyze a real dataset end-to-end and present your findings as a dashboard; your trainer will assign the exact brief and guide you through it",
        ],
        "learning_outcomes": ["Analyze real datasets", "Build interactive dashboards", "Communicate insights effectively"],
        "instructor": "Zenvora Faculty",
    },
    {
        "title": "Mobile App Development",
        "description": "Build and deploy cross-platform mobile apps with Flutter and native Android fundamentals.",
        "price": 999,
        "duration": "10 weeks",
        "level": "Beginner to Intermediate",
        "technology": ["Flutter", "Kotlin", "Firebase"],
        "topics": ["Android", "Kotlin", "Flutter", "Firebase", "REST API", "App Deployment"],
        "syllabus": [
            "Mobile UI Foundations — Layouts, navigation patterns, and mobile design principles",
            "Kotlin Basics — Core syntax, classes, and native Android fundamentals",
            "Flutter Widgets & State — Building UIs with widgets and managing app state",
            "Working with APIs — Fetching and displaying data from REST APIs",
            "Firebase Integration — Authentication, real-time database, and cloud storage",
            "Testing & Debugging — Finding and fixing issues before release",
            "Capstone Build — Design, build, and publish a complete mobile app to an app store; your trainer will assign the exact brief and guide you through it",
        ],
        "learning_outcomes": ["Build cross-platform apps", "Integrate backend services", "Publish apps to stores"],
        "instructor": "Zenvora Faculty",
    },
]


async def seed():
    print("Seeding Zenvora Technology database...")
    await create_indexes()

    # Clear existing data for a clean re-seed
    for coll in [
        users_collection, student_profiles_collection, professional_profiles_collection,
        courses_collection, registrations_collection, batches_collection,
        announcements_collection, activity_logs_collection, certificates_collection,
    ]:
        await coll.delete_many({})

    now = datetime.now(timezone.utc)

    # --- Admin ---
    admin_id = "ADM-00000001"
    await users_collection.insert_one({
        "user_id": admin_id, "name": "Zenvora Admin", "email": "admin@zenvoratechnology.com",
        "phone": "+91 9025168077", "password_hash": hash_password(DEMO_PASSWORD),
        "role": "admin", "status": "active", "profile_image": None,
        "created_at": now, "updated_at": now, "last_login": None,
    })

    # --- Professional ---
    pro_id = "PRO-00000001"
    await users_collection.insert_one({
        "user_id": pro_id, "name": "Arun Kumar", "email": "professional@zenvoratechnology.com",
        "phone": "+91 9042938077", "password_hash": hash_password(DEMO_PASSWORD),
        "role": "professional", "status": "active", "profile_image": None,
        "created_at": now, "updated_at": now, "last_login": None,
    })
    await professional_profiles_collection.insert_one({
        "user_id": pro_id, "designation": "Senior Trainer", "specialization": "Full Stack Development",
        "experience_years": 6, "assigned_courses": [], "bio": "Full stack trainer with 6 years of industry experience.",
    })

    # --- Student ---
    student_id = "STU-00000001"
    await users_collection.insert_one({
        "user_id": student_id, "name": "Akshaya R", "email": "student@zenvoratechnology.com",
        "phone": "+91 9876543210", "password_hash": hash_password(DEMO_PASSWORD),
        "role": "student", "status": "active", "profile_image": None,
        "created_at": now, "updated_at": now, "last_login": None,
    })
    await student_profiles_collection.insert_one({
        "user_id": student_id, "date_of_birth": "2003-05-14", "gender": "Female",
        "college": "PSG College of Technology", "degree": "B.E.", "department": "Computer Science",
        "year_of_study": "3rd Year", "address": "Coimbatore, Tamil Nadu", "bio": "Aspiring full stack developer.",
    })

    # --- Courses ---
    course_ids = []
    for c in COURSES:
        course_id = f"CRS-{uuid.uuid4().hex[:8].upper()}"
        course_ids.append((course_id, c["title"]))
        await courses_collection.insert_one({
            **c, "course_id": course_id, "status": "active",
            "created_at": now, "updated_at": now, "rating": 4.6, "students_enrolled": 0,
        })

    await professional_profiles_collection.update_one(
        {"user_id": pro_id}, {"$set": {"assigned_courses": [course_ids[0][0]]}}
    )

    # --- Batch ---
    batch_id = f"BATCH-{uuid.uuid4().hex[:8].upper()}"
    await batches_collection.insert_one({
        "batch_id": batch_id, "batch_name": "FSD Morning Batch - Sep 2026", "course_id": course_ids[0][0],
        "professional_id": pro_id, "start_date": "2026-09-15", "end_date": "2026-12-08",
        "schedule": "Mon-Fri, 10:00 AM - 12:00 PM", "max_students": 30, "status": "upcoming",
        "current_students": 1, "created_at": now,
    })

    # --- Registration ---
    reg_id = f"REG-{uuid.uuid4().hex[:8].upper()}"
    await registrations_collection.insert_one({
        "registration_id": reg_id, "student_id": student_id, "student_name": "Akshaya R",
        "course_id": course_ids[0][0], "course_name": course_ids[0][1],
        "registration_date": now, "status": "active", "payment_status": "paid",
        "batch_id": batch_id, "assigned_professional_id": pro_id, "progress": 29,
        "completed_modules": [1, 2],  # 2 of 7 modules done ≈ 29%, so the demo account can show the unlocked-modules flow
    })

    # --- Announcement ---
    await announcements_collection.insert_one({
        "announcement_id": f"ANN-{uuid.uuid4().hex[:8].upper()}", "title": "Welcome to Zenvora Learning!",
        "message": "New batches for Full Stack Development and AI & Machine Learning start September 15th. Enroll now!",
        "audience": "all_students", "target_id": None, "priority": "normal", "date": now,
    })

    # --- Activity logs ---
    sample_actions = ["LOGIN_SUCCESS", "COURSE_REGISTERED", "PROFILE_UPDATED"]
    for i, action in enumerate(sample_actions):
        await activity_logs_collection.insert_one({
            "log_id": str(uuid.uuid4()), "user_id": student_id, "user_role": "student",
            "user_email": "student@zenvoratechnology.com", "action": action, "status": "success",
            "timestamp": now - timedelta(hours=i * 3), "ip_address": "127.0.0.1",
            "user_agent": "Mozilla/5.0", "device": "Desktop", "browser": "Chrome", "details": None,
        })

    print("Seed complete.")
    print("--------------------------------------------------")
    print("Demo Admin:        admin@zenvoratechnology.com / ChangeMe@123")
    print("Demo Professional: professional@zenvoratechnology.com / ChangeMe@123")
    print("Demo Student:      student@zenvoratechnology.com / ChangeMe@123")
    print("--------------------------------------------------")
    print("These are DEVELOPMENT accounts. Change passwords before production.")


if __name__ == "__main__":
    asyncio.run(seed())
