import { motion } from 'framer-motion'
import { Inbox, AlertTriangle } from 'lucide-react'

export function StatCard({ icon: Icon, label, value, accent = 'primary' }) {
  const accentMap = {
    primary: 'text-primary bg-primary/10',
    accent: 'text-accent bg-accent/10',
    cyan: 'text-cyan bg-cyan/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
  }
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="glass rounded-2xl p-5 flex items-center gap-4"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accentMap[accent]}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-display font-semibold leading-none">{value}</p>
        <p className="text-xs text-muted mt-1 truncate">{label}</p>
      </div>
    </motion.div>
  )
}

export function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted text-sm">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      {label}
    </div>
  )
}

export function EmptyState({ message = 'Nothing here yet', icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted glass rounded-2xl">
      <Icon size={28} className="opacity-50" />
      <p className="text-sm">{message}</p>
    </div>
  )
}

export function ErrorState({ message = 'Something went wrong. Please try again.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted glass rounded-2xl">
      <AlertTriangle size={28} className="text-danger opacity-70" />
      <p className="text-sm text-center max-w-sm">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-xs text-primary font-medium mt-1">Retry</button>
      )}
    </div>
  )
}

export function Badge({ status }) {
  const map = {
    active: 'bg-success/15 text-success',
    completed: 'bg-cyan/15 text-cyan',
    pending: 'bg-warning/15 text-warning',
    cancelled: 'bg-danger/15 text-danger',
    confirmed: 'bg-primary/15 text-primary',
    paid: 'bg-success/15 text-success',
    inactive: 'bg-danger/15 text-danger',
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${map[status] || 'bg-deepBrown/10 text-muted'}`}>
      {status}
    </span>
  )
}

export function SkeletonCard() {
  return <div className="glass rounded-2xl h-24 animate-pulse" />
}
