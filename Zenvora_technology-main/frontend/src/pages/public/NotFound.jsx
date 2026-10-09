import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-5 text-center relative overflow-hidden">
      <div className="orb w-96 h-96 bg-primary/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
      <motion.h1
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="font-display text-6xl font-semibold text-gradient mb-3 relative"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-muted mb-6 relative"
      >
        This page doesn't exist.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="relative"
      >
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-aurora-gradient font-medium hover:shadow-glow transition-shadow inline-block">
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
