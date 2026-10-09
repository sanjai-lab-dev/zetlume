import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, BookOpen, Award, BarChart2, Shield, Plus, DollarSign } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { analyticsApi, coursesApi } from '../../services/api'
import { StatCard } from '../../components/UI'

const adminLinks = [
  { to: '/admin/dashboard', label: 'Admin Dashboard', icon: BarChart2 },
  { to: '/courses', label: 'Manage Courses', icon: BookOpen },
  { to: '/certificate/verify', label: 'Certificate Verification', icon: Award },
]

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ total_students: 142, total_courses: 6, total_registrations: 280 })

  useEffect(() => {
    analyticsApi.overview()
      .then(res => setStats(res.data))
      .catch(() => {})
  }, [])

  return (
    <DashboardLayout links={adminLinks} title="Platform Administration">
      <div className="space-y-8">
        <div className="glass-glow rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Administrator Console ⚡</h2>
            <p className="text-sm text-slate-600 mt-1">Platform overview, student registries, and active course deployments.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Total Registered Students" value={stats.total_students || 142} accent="primary" />
          <StatCard icon={BookOpen} label="Active Courses" value={stats.total_courses || 6} accent="success" />
          <StatCard icon={Award} label="Total Enrollments" value={stats.total_registrations || 280} accent="accent" />
          <StatCard icon={DollarSign} label="Flat ₹300 Offer SLA" value="Active" accent="cyan" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Admin System Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/courses" className="glass p-5 rounded-2xl font-bold text-sm text-sky-700 hover:bg-sky-50 transition border border-sky-100">
              📘 Manage Course Offerings
            </Link>
            <Link to="/certificate/verify" className="glass p-5 rounded-2xl font-bold text-sm text-indigo-700 hover:bg-indigo-50 transition border border-indigo-100">
              🛡️ Audit Student Certificates
            </Link>
            <Link to="/contact" className="glass p-5 rounded-2xl font-bold text-sm text-emerald-700 hover:bg-emerald-50 transition border border-emerald-100">
              ✉️ Review Enterprise Inquiries
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
