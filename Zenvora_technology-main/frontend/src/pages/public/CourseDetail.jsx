import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Clock, BarChart3, User, Award, CheckCircle2, Tag, Wrench } from 'lucide-react'
import toast from 'react-hot-toast'
import { coursesApi, registrationsApi } from '../../services/api'
import { Loader, ErrorState } from '../../components/UI'
import { useAuth } from '../../context/AuthContext'

const OFFER_DISCOUNT = 300

// Syllabus entries can be a plain string ("Module Title") or carry a real
// description after an em dash ("Module Title — actual module content").
// Older/simpler courses use the plain form and fall back to generic copy;
// richer courses (like the Ethical Hacking program) supply real content.
function parseSyllabusItem(item) {
  const [title, ...rest] = item.split(' — ')
  const description = rest.join(' — ')
  return { title: title.trim(), description: description.trim() }
}

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [openIdx, setOpenIdx] = useState(0)
  const [registering, setRegistering] = useState(false)

  useEffect(() => {
    coursesApi
      .get(id)
      .then((res) => setCourse(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  const handleRegister = async () => {
    if (!user) {
      toast('Please login to register for this course')
      navigate('/login')
      return
    }
    if (user.role !== 'student') {
      toast.error('Only student accounts can register for courses')
      return
    }
    setRegistering(true)
    try {
      const res = await registrationsApi.create({ course_id: id })
      toast.success('Registration successful. Complete payment to unlock your modules.')
      navigate(`/student/payment/${res.data.registration_id}`)
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed')
    } finally {
      setRegistering(false)
    }
  }

  if (loading) return <Loader label="Loading course..." />
  if (error || !course) return <ErrorState message="Course not found." />

  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-8 md:p-10 mb-10">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">{course.level}</span>
          <motion.span
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-success/15 text-success font-medium"
          >
            <Tag size={12} /> Limited-time: ₹{OFFER_DISCOUNT} off
          </motion.span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-semibold mt-4 mb-4">{course.title}</h1>
        <p className="text-muted leading-relaxed mb-6">{course.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted"><Clock size={16} /> {course.duration}</div>
          <div className="flex items-center gap-2 text-sm text-muted"><BarChart3 size={16} /> {course.level}</div>
          <div className="flex items-center gap-2 text-sm text-muted"><User size={16} /> {course.instructor || 'Zenvora Faculty'}</div>
          <div className="flex items-center gap-2 text-sm text-muted"><Award size={16} /> Certificate included</div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-3xl font-semibold">₹{Math.max(course.price - OFFER_DISCOUNT, 0)}</span>
            <span className="text-base text-muted line-through">₹{course.price}</span>
          </div>
          <button
            onClick={handleRegister}
            disabled={registering}
            className="px-6 py-3 rounded-xl bg-aurora-gradient font-medium hover:shadow-glow transition-shadow disabled:opacity-60"
          >
            {registering ? 'Registering...' : 'Register Now'}
          </button>
        </div>
      </motion.div>

      {course.learning_outcomes?.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display text-xl font-medium mb-4">What you'll learn</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {course.learning_outcomes.map((o) => (
              <div key={o} className="flex items-start gap-2 text-sm text-muted">
                <CheckCircle2 size={16} className="text-success mt-0.5 shrink-0" /> {o}
              </div>
            ))}
          </div>
        </div>
      )}

      {course.technology?.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display text-xl font-medium mb-4 flex items-center gap-2">
            <Wrench size={18} className="text-primary" /> Tools & Technologies You'll Use
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {course.technology.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-3.5 py-1.5 rounded-full text-sm glass border border-accent/25 text-text"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {course.syllabus?.length > 0 && (
        <div>
          <h2 className="font-display text-xl font-medium mb-4">Curriculum</h2>
          <div className="space-y-2">
            {course.syllabus.map((rawModule, i) => {
              const { title, description } = parseSyllabusItem(rawModule)
              return (
                <div key={rawModule} className="glass rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-sm font-medium">Module {i + 1}: {title}</span>
                    <motion.span animate={{ rotate: openIdx === i ? 180 : 0 }}>
                      <ChevronDown size={16} className="text-muted" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openIdx === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-4 text-sm text-muted"
                      >
                        {description || `Covers core concepts and hands-on practice for ${title.toLowerCase()}.`}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
