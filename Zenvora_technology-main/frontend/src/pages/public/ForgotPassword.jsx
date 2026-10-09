import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      toast.success('Password reset link sent to your email.')
    }, 1000)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5 py-16 bg-grid relative overflow-hidden">
      <div className="orb w-80 h-80 bg-sky-400/20 -top-10 -left-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative glass-glow rounded-3xl p-8 md:p-10 w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2 font-display font-semibold mb-8">
          <span className="w-8 h-8 rounded-lg bg-aurora-gradient flex items-center justify-center text-white font-bold">
            Z
          </span>
          Zenvora Technology
        </Link>

        {sent ? (
          <div className="text-center py-4">
            <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Check Your Inbox</h2>
            <p className="text-xs text-slate-600 mb-6">
              We've sent password reset instructions to <span className="font-semibold text-slate-900">{email}</span>.
            </p>
            <Link to="/login" className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 hover:text-sky-700">
              <ArrowLeft size={14} /> Back to Login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-display text-2xl font-semibold mb-1">Reset your password</h1>
            <p className="text-xs text-slate-500 mb-8">
              Enter your registered work or student email address and we'll send you a password reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-md hover:from-sky-700 transition disabled:opacity-60"
              >
                {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
              </button>
            </form>

            <p className="text-xs text-slate-500 text-center mt-6">
              Remember your password? <Link to="/login" className="text-sky-600 font-bold hover:underline">Back to Login</Link>
            </p>
          </>
        )}
      </motion.div>
    </div>
  )
}
