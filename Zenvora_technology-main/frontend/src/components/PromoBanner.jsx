import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, ArrowRight, Tag } from 'lucide-react'

export default function PromoBanner() {
  const [visible, setVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 23,
    minutes: 58,
    seconds: 53
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!visible) return null

  const formatTwoDigits = (num) => String(num).padStart(2, '0')

  return (
    <div className="relative z-50 bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white text-xs sm:text-sm py-2 px-4 shadow-md border-b border-sky-900/50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 px-2.5 py-0.5 text-xs font-semibold text-sky-300 border border-sky-500/30">
            <Tag className="h-3 w-3 text-sky-400" />
            Limited-time offer: Flat ₹300 off every course
          </span>
          <div className="inline-flex items-center gap-1 bg-slate-950/80 px-3 py-1 rounded-lg font-mono text-xs text-sky-300 border border-sky-800/60 font-bold tracking-wider shadow-inner">
            <span>{formatTwoDigits(timeLeft.days)}d</span>
            <span className="text-sky-500">:</span>
            <span>{formatTwoDigits(timeLeft.hours)}h</span>
            <span className="text-sky-500">:</span>
            <span>{formatTwoDigits(timeLeft.minutes)}m</span>
            <span className="text-sky-500">:</span>
            <span>{formatTwoDigits(timeLeft.seconds)}s</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-3.5 py-1 text-xs transition shadow-sm hover:shadow-md"
          >
            Claim Offer
            <ArrowRight className="h-3 w-3" />
          </Link>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

