import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await login(email, password)
      toast.success('Login successful.')
      const redirect = location.state?.from || `/${user.role}/dashboard`
      navigate(redirect, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5 py-16 bg-grid relative overflow-hidden">
      <div className="orb w-80 h-80 bg-primary/25 -top-10 -left-10" />
      <div className="orb w-80 h-80 bg-cyan/20 bottom-0 right-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative glass-glow rounded-3xl p-8 md:p-10 w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2 font-display font-semibold mb-8">
          <span className="w-8 h-8 rounded-lg bg-aurora-gradient flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </span>
          Zenvora Technology
        </Link>

        <h1 className="font-display text-2xl font-semibold mb-1">Welcome back</h1>
        <p className="text-sm text-muted mb-8">Login as a student, professional or admin — access is based on your account role.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-muted mb-1.5 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@zenvoratechnology.com"
              className="w-full bg-deepBrown/5 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-xs text-muted mb-1.5 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-deepBrown/5 rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-muted">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-primary" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-primary">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-xl bg-aurora-gradient font-medium hover:shadow-glow transition-shadow disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-muted text-center mt-6">
          Don't have an account? <Link to="/register" className="text-primary font-medium">Register</Link>
        </p>

        <div className="mt-6 pt-6 border-t border-deepBrown/10 text-xs text-muted text-center">
          Demo accounts (development only): admin / professional / student @zenvoratechnology.com — password ChangeMe@123
        </div>
      </motion.div>
    </div>
  )
}
