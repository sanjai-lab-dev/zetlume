import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  Menu,
  X,
  Code2,
  Smartphone,
  Cpu,
  Cloud,
  Layout,
  Megaphone,
  GraduationCap,
  FileCheck2,
  Users2,
  Receipt,
  Sparkles,
  ArrowRight,
  UserCheck,
  Calendar,
  BookOpen,
  Info,
  Mail,
  LogIn,
  LayoutDashboard,
  LogOut
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Avatar from './Avatar'

const servicesMenu = [
  {
    icon: Code2,
    title: 'Web Development Solutions',
    desc: 'High performance Next.js & Vite applications engineered for speed and conversion.',
    to: '/services#web-dev'
  },
  {
    icon: Smartphone,
    title: 'App Development Solutions',
    desc: 'Cross-platform iOS & Android mobile apps with native fluid UI.',
    to: '/services#app-dev'
  },
  {
    icon: Cpu,
    title: 'AI/ML Digital Products',
    desc: 'Custom LLM integrations, intelligent chatbots, & predictive analytics engines.',
    to: '/services#ai-ml'
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps Architecture',
    desc: 'Automated CI/CD pipelines, AWS/GCP deployments, & 99.99% uptime hosting.',
    to: '/services#cloud'
  },
  {
    icon: Layout,
    title: 'UI/UX Product Design',
    desc: 'Modern, high-converting interface design systems & interactive prototypes.',
    to: '/services#ui-ux'
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing Strategies',
    desc: 'Data-driven SEO, brand positioning, and customer acquisition campaigns.',
    to: '/services#marketing'
  }
]

const productsMenu = [
  {
    icon: GraduationCap,
    title: 'Zenvora LMS Platform',
    desc: 'Comprehensive learning management system for schools and corporate training.',
    to: '/courses'
  },
  {
    icon: FileCheck2,
    title: 'AI Online Exam Portal',
    desc: 'Proctored online assessment engine with instant analytics & certification.',
    to: '/courses#exam-portal'
  },
  {
    icon: Users2,
    title: 'Candidate Matcher Engine',
    desc: 'AI tool matching job descriptions with top engineering talent automatically.',
    to: '/projects#candidates'
  },
  {
    icon: Receipt,
    title: 'Stipend Tracker Portal',
    desc: 'Real-time internship, stipend, and project milestone monitoring portal.',
    to: '/certificate/verify'
  }
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null) // 'services' | 'products' | null
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  const dashboardPath = user ? `/${user.role}/dashboard` : '/login'

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 transition-all duration-300 bg-white/85 shadow-[0_10px_30px_rgba(2,6,23,0.08)] backdrop-blur-xl border-b border-sky-100/80">
      {/* Top subtle blue accent gradient line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="group relative flex items-center gap-2">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-sky-500/30 to-indigo-500/30 opacity-0 blur-md transition duration-300 group-hover:opacity-100"></div>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 via-blue-600 to-teal-500 text-white shadow-md shadow-sky-500/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="relative flex flex-col">
                <span className="roboto-bold text-xl leading-tight tracking-tight text-slate-900">
                  Zenvora<span className="text-sky-600">.</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-slate-500">
                  Technology
                </span>
              </div>
            </Link>

            {/* Desktop Nav Items */}
            <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {/* Services Dropdown Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                    activeDropdown === 'services'
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      activeDropdown === 'services' ? 'rotate-180 text-sky-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                {/* Services Dropdown Panel */}
                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-[580px] rounded-2xl border border-sky-100 bg-white p-4 shadow-xl shadow-slate-900/10 backdrop-blur-xl"
                    >
                      <div className="mb-3 px-3 py-1.5 flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Our Digital Solutions</span>
                        <Link to="/services" onClick={() => setActiveDropdown(null)} className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                          View All Services <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {servicesMenu.map((item) => {
                          const Icon = item.icon
                          return (
                            <Link
                              key={item.title}
                              to={item.to}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-sky-50/70"
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100/80 text-sky-600 transition group-hover:bg-sky-600 group-hover:text-white">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-900 group-hover:text-sky-700">
                                  {item.title}
                                </p>
                                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Products Dropdown Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                    activeDropdown === 'products'
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  Products
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      activeDropdown === 'products' ? 'rotate-180 text-sky-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                {/* Products Dropdown Panel */}
                <AnimatePresence>
                  {activeDropdown === 'products' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-[520px] rounded-2xl border border-sky-100 bg-white p-4 shadow-xl shadow-slate-900/10 backdrop-blur-xl"
                    >
                      <div className="mb-3 px-3 py-1.5 flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Enterprise SaaS Suite</span>
                        <Link to="/courses" onClick={() => setActiveDropdown(null)} className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                          Explore Products <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {productsMenu.map((item) => {
                          const Icon = item.icon
                          return (
                            <Link
                              key={item.title}
                              to={item.to}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-sky-50/70"
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100/80 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">
                                  {item.title}
                                </p>
                                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct Navigation Links */}
              <Link to="/" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100/80 hover:text-slate-900">
                Home
              </Link>
              <Link to="/about" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100/80 hover:text-slate-900">
                About
              </Link>
              <Link to="/services" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100/80 hover:text-slate-900">
                Services
              </Link>
              <Link to="/courses" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100/80 hover:text-slate-900">
                Courses
              </Link>
              <Link to="/projects" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100/80 hover:text-slate-900">
                Projects
              </Link>
              <Link to="/contact" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100/80 hover:text-slate-900">
                Contact
              </Link>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  to={dashboardPath}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                >
                  <Avatar src={user.profile_image} name={user.name} size={24} />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" /> Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <LogIn className="h-4 w-4" /> Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition hover:from-sky-700 hover:via-blue-700 hover:to-indigo-700 hover:shadow-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden overflow-hidden"
          >
            <div className="space-y-1 px-4 pb-6 pt-3">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-900 hover:bg-slate-100"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-900 hover:bg-slate-100"
              >
                About
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-900 hover:bg-slate-100"
              >
                Services
              </Link>
              <Link
                to="/courses"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-900 hover:bg-slate-100"
              >
                Courses
              </Link>
              <Link
                to="/projects"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-900 hover:bg-slate-100"
              >
                Projects
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-900 hover:bg-slate-100"
              >
                Contact
              </Link>

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link
                      to={dashboardPath}
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-800"
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        handleLogout()
                        setMobileOpen(false)
                      }}
                      className="w-full text-center rounded-xl bg-rose-50 text-rose-600 py-2.5 text-sm font-semibold"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-800"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-md"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
