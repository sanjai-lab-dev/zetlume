import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, BookOpen, Award, CheckCircle, Plus, ShieldCheck } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { professionalsApi, coursesApi } from '../../services/api'
import { StatCard } from '../../components/UI'

const proLinks = [
  { to: '/professional/dashboard', label: 'Pro Dashboard', icon: BookOpen },
  { to: '/courses', label: 'All Courses', icon: BookOpen },
  { to: '/certificate/verify', label: 'Verify Certificate', icon: Award },
]

export default function ProfessionalDashboard() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    coursesApi.list()
      .then(res => setCourses(res.data || []))
      .catch(() => {
        setCourses([
          { course_id: '1', title: 'Full Stack Development', enrolled_count: 42, duration: '12 Weeks' },
          { course_id: '2', title: 'Cyber Security & Ethical Hacking', enrolled_count: 38, duration: '10 Weeks' },
        ])
      })
  }, [])

  return (
    <DashboardLayout links={proLinks} title="Professional Instructor Portal">
      <div className="space-y-8">
        <div className="glass-glow rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome, {user?.name || 'Instructor'}! 🚀</h2>
            <p className="text-sm text-slate-600 mt-1">Manage assigned batches, evaluate student submissions, and issue course certificates.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={BookOpen} label="Assigned Courses" value={courses.length} accent="primary" />
          <StatCard icon={Users} label="Total Students" value={80} accent="success" />
          <StatCard icon={Award} label="Issued Certificates" value={24} accent="accent" />
          <StatCard icon={ShieldCheck} label="Designation" value={user?.designation || 'Faculty'} accent="cyan" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Assigned Teaching Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((c) => (
              <div key={c.course_id} className="glass rounded-2xl p-6 border border-sky-100 shadow-sm">
                <h4 className="font-bold text-lg text-slate-900 mb-2">{c.title}</h4>
                <p className="text-xs text-slate-500 mb-4">Duration: {c.duration || '10 Weeks'} · Enrolled Students: {c.enrolled_count || 30}</p>
                <div className="flex gap-2">
                  <Link to="/courses" className="px-3.5 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold">
                    View Course Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
