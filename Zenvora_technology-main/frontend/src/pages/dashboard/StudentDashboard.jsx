import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, CheckCircle, Clock, Award, ArrowRight, Play, AlertCircle, DollarSign } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { registrationsApi, coursesApi } from '../../services/api'
import { Loader, StatCard } from '../../components/UI'

const studentLinks = [
  { to: '/student/dashboard', label: 'My Dashboard', icon: BookOpen },
  { to: '/courses', label: 'Explore Courses', icon: ArrowRight },
  { to: '/certificate/verify', label: 'Verify Certificate', icon: Award },
]

export default function StudentDashboard() {
  const { user } = useAuth()
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    registrationsApi.my()
      .then((res) => setRegistrations(res.data || []))
      .catch(() => {
        // Fallback mock data if backend not active
        setRegistrations([
          {
            registration_id: 'REG-101',
            course: {
              course_id: 'fullstack-dev',
              title: 'Full Stack Development (React & Node.js)',
              duration: '12 Weeks',
              level: 'Intermediate',
              syllabus: ['HTML, CSS & React Basics', 'Node.js & Express REST APIs', 'Database & Cloud Deployment']
            },
            status: 'confirmed',
            payment_status: 'paid',
            completed_modules: [1],
            created_at: new Date().toISOString()
          },
          {
            registration_id: 'REG-102',
            course: {
              course_id: 'ai-ml',
              title: 'AI & Machine Learning Engineering',
              duration: '10 Weeks',
              level: 'Advanced',
              syllabus: ['Python for Data Science', 'Deep Learning & Neural Networks', 'LLM Fine-tuning & RAG']
            },
            status: 'confirmed',
            payment_status: 'pending',
            completed_modules: [],
            created_at: new Date().toISOString()
          }
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <DashboardLayout links={studentLinks} title="Student Portal">
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="glass-glow rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name || 'Student'}! 👋</h2>
            <p className="text-sm text-slate-600 mt-1">Track your enrolled courses, module progress, and certifications.</p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold text-sm shadow-md hover:from-sky-700 hover:to-indigo-700 transition"
          >
            Explore Courses <ArrowRight size={16} />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={BookOpen} label="Enrolled Courses" value={registrations.length} accent="primary" />
          <StatCard icon={CheckCircle} label="Completed Modules" value={registrations.reduce((acc, r) => acc + (r.completed_modules?.length || 0), 0)} accent="success" />
          <StatCard icon={Award} label="Certificates Earned" value={registrations.filter(r => r.status === 'completed').length} accent="accent" />
          <StatCard icon={Clock} label="Account Role" value={user?.role || 'Student'} accent="cyan" />
        </div>

        {/* My Enrolled Courses */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">My Enrolled Courses</h3>
          
          {loading ? (
            <Loader label="Loading your courses..." />
          ) : registrations.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center">
              <BookOpen className="h-10 w-10 text-sky-500 mx-auto mb-3" />
              <p className="text-slate-700 font-semibold mb-1">No courses registered yet</p>
              <p className="text-xs text-slate-500 mb-4">Explore our industry-focused programs and start learning today.</p>
              <Link to="/courses" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 text-white font-semibold text-xs">
                Browse Courses <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registrations.map((reg) => {
                const totalModules = reg.course?.syllabus?.length || 3
                const completedCount = reg.completed_modules?.length || 0
                const progressPercent = Math.round((completedCount / totalModules) * 100)

                return (
                  <motion.div
                    key={reg.registration_id}
                    whileHover={{ y: -3 }}
                    className="glass rounded-2xl p-6 border border-sky-100 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${
                          reg.payment_status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {reg.payment_status === 'paid' ? 'Paid & Active' : 'Payment Pending'}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">ID: {reg.registration_id}</span>
                      </div>

                      <h4 className="font-bold text-lg text-slate-900 mb-2">{reg.course?.title || 'Zenvora Course'}</h4>
                      <p className="text-xs text-slate-500 mb-4">Duration: {reg.course?.duration || '10 Weeks'} · Level: {reg.course?.level || 'All Levels'}</p>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-slate-600 font-medium mb-1">
                          <span>Course Progress</span>
                          <span>{progressPercent}% ({completedCount}/{totalModules} modules)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      {reg.payment_status === 'pending' ? (
                        <Link
                          to={`/student/payment/${reg.registration_id}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold"
                        >
                          <DollarSign size={14} /> Pay ₹300 Off Price
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold"
                        >
                          <Play size={14} /> Continue Learning
                        </button>
                      )}
                      <span className="text-xs font-semibold text-slate-500">
                        {reg.course?.instructor || 'Zenvora Faculty'}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
