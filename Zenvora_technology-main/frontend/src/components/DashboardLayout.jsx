import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'
import Avatar from './Avatar'

export default function DashboardLayout({ links, title, children }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const Sidebar = ({ mobile }) => (
    <div className="flex flex-col h-full">
      <Link to="/" className="flex items-center gap-2 font-display font-semibold px-5 py-5">
        <span className="w-8 h-8 rounded-lg bg-aurora-gradient flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </span>
        Zenvora
      </Link>
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {links.map((l) => {
          const active = location.pathname === l.to
          return (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => mobile && setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active ? 'bg-primary/15 text-primary border border-primary/25' : 'text-muted hover:bg-deepBrown/5 hover:text-text'
              }`}
            >
              <l.icon size={17} />
              {l.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-deepBrown/5">
        <div className="glass rounded-lg px-3 py-2.5 mb-2 flex items-center gap-2.5">
          <Avatar src={user?.profile_image} name={user?.name} size={32} />
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-danger hover:bg-danger/10 transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background bg-grid flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-deepBrown/5 glass sticky top-0 h-screen">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed left-0 top-0 h-screen w-64 bg-secondary z-50 lg:hidden"
            >
              <Sidebar mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 glass border-b border-deepBrown/5 h-16 flex items-center justify-between px-5 lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
          <h1 className="font-display font-semibold text-lg">{title}</h1>
          <ThemeToggle compact />
        </header>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="p-5 lg:p-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
