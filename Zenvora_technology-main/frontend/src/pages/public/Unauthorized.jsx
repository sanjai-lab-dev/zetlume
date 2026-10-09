import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldAlert } from 'lucide-react'

export default function Unauthorized() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-5 text-center relative overflow-hidden">
      <div className="orb w-80 h-80 bg-danger/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        className="relative"
      >
        <ShieldAlert size={40} className="text-danger mb-4" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display text-2xl font-semibold mb-2 relative"
      >
        Access restricted
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-muted mb-6 max-w-sm relative"
      >
        You don't have permission to view this page. Try logging in with the correct account type.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-aurora-gradient font-medium hover:shadow-glow transition-shadow inline-block">
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
