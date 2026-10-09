import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Clock, ArrowRight, Search, Tag, Sparkles, GraduationCap } from 'lucide-react'
import { coursesApi } from '../../services/api'
import { Loader, EmptyState, ErrorState } from '../../components/UI'

const OFFER_DISCOUNT = 300

export default function Courses() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')

  const load = () => {
    setLoading(true)
    setError(false)
    coursesApi
      .list({ status_filter: 'active' })
      .then((res) => setCourses(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const filtered = courses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="max-w-6xl mx-auto px-5 py-16 relative">
      <div className="orb w-96 h-96 bg-accent/20 -top-24 left-1/2 -translate-x-1/2 animate-float-slow" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 relative"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 text-xs glass px-4 py-1.5 rounded-full mb-5 text-primary"
        >
          <GraduationCap size={13} /> Zenvora Learning
        </motion.span>
        <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4 text-shimmer">Explore Our Courses</h1>
        <p className="text-muted max-w-2xl mx-auto leading-relaxed">
          Carefully structured, industry-relevant technology courses designed to build real skills.
          Learn → Practice → Build → Grow.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-2xl mx-auto mb-10 glass-glow rounded-2xl px-6 py-4 flex items-center justify-center gap-2 text-center relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 opacity-25"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,106,0.7), transparent)', width: '30%' }}
          animate={{ x: ['-100%', '350%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
        />
        <Tag size={16} className="text-success relative shrink-0" />
        <p className="text-sm relative">
          <span className="font-semibold text-success">₹{OFFER_DISCOUNT} off</span> every course for a limited time — prices below already reflect the discount.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-md mx-auto mb-12 relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="w-full glass rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-accent/50 border border-transparent transition-colors"
        />
      </motion.div>

      {loading && <Loader label="Loading courses..." />}
      {error && <ErrorState message="Couldn't load courses. Is the backend running?" onRetry={load} />}
      {!loading && !error && filtered.length === 0 && <EmptyState message="No courses found" />}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => (
            <motion.div
              key={c.course_id}
              role="button"
              tabIndex={0}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate(`/courses/${c.course_id}`)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/courses/${c.course_id}`)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-transparent hover:border-accent/40 shadow-soft hover:shadow-elegant transition-all flex flex-col"
            >
              <div className="h-2 bg-aurora-gradient" />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{c.level}</span>
                  <motion.span
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-success/15 text-success font-medium"
                  >
                    <Tag size={11} /> ₹{OFFER_DISCOUNT} OFF
                  </motion.span>
                </div>

                <h3 className="font-display text-lg font-medium mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                <p className="text-sm text-muted mb-4 line-clamp-2 leading-relaxed">{c.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(c.topics || []).slice(0, 4).map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-md bg-beige/60 text-muted">{t}</span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted mb-5">
                  <span className="flex items-center gap-1"><Clock size={13} /> {c.duration}</span>
                  <span className="flex items-center gap-1"><Users size={13} /> {c.enrolled_count || 0} enrolled</span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-beige/70">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-xl font-semibold text-primary">₹{Math.max(c.price - OFFER_DISCOUNT, 0)}</span>
                    <span className="text-xs text-muted line-through">₹{c.price}</span>
                  </div>
                  <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={14} />
                  </span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute top-4 right-4 text-accent pointer-events-none"
              >
                <Sparkles size={16} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
