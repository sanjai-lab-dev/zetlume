import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

// A small pill toggle: click to swap between the Royal Brown and Royal Blue
// presets. Both are gold-accented, so the crown icon and gold ring stay
// constant while the track color swaps to preview the active theme.
export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme()
  const isBlue = theme === 'royal-blue'

  return (
    <button
      onClick={toggleTheme}
      title={isBlue ? 'Switch to Royal Brown & Gold' : 'Switch to Royal Blue & Gold'}
      className="relative flex items-center gap-2 group"
      aria-label="Toggle color theme"
    >
      <span
        className="relative w-12 h-6 rounded-full flex items-center px-0.5 transition-colors duration-300"
        style={{ background: isBlue ? '#12215C' : '#4A1E0C' }}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shadow-sm"
          style={{ marginLeft: isBlue ? 'auto' : 0 }}
        >
          <Crown size={11} className="text-white" fill="currentColor" />
        </motion.span>
      </span>
      {!compact && (
        <span className="text-xs text-muted hidden sm:inline">
          {isBlue ? 'Royal Blue' : 'Royal Brown'}
        </span>
      )}
    </button>
  )
}
