import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ArrowRight, ArrowLeft, Check, GraduationCap, Briefcase } from 'lucide-react'
import toast from 'react-hot-toast'
import { authApi } from '../../services/api'

const initialStudent = {
  name: '', email: '', phone: '', password: '', confirmPassword: '',
  date_of_birth: '', gender: '', college: '', degree: '', department: '', year_of_study: '', address: '',
}
const initialPro = { name: '', email: '', phone: '', password: '', confirmPassword: '', designation: '', specialization: '' }

const STEPS = ['Account type', 'Your details', 'Secure your account']

export default function Register() {
  const [role, setRole] = useState('student')
  const [step, setStep] = useState(0)
  const [studentForm, setStudentForm] = useState(initialStudent)
  const [proForm, setProForm] = useState(initialPro)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const form = role === 'student' ? studentForm : proForm
  const setForm = role === 'student' ? setStudentForm : setProForm

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validateStep = (targetStep) => {
    const errs = {}
    if (targetStep === 1) {
      if (!form.name) errs.name = 'Full name is required'
      if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address'
      if (!form.phone || form.phone.length < 10) errs.phone = 'Enter a valid phone number'
    }
    if (targetStep === 2) {
      if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters'
      if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const goNext = () => {
    if (step === 1 && !validateStep(1)) return
    setStep((s) => Math.min(s + 1, 2))
  }
  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(2)) return
    setLoading(true)
    try {
      const { confirmPassword, ...payload } = form
      if (role === 'student') {
        await authApi.registerStudent(payload)
      } else {
        await authApi.registerProfessional({ ...payload, experience_years: null })
      }
      toast.success('Account created successfully.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-5 py-16 bg-grid relative overflow-hidden">
      <div className="orb w-96 h-96 bg-accent/25 -top-20 -right-20 animate-float-slow" />
      <div className="orb w-80 h-80 bg-primary/20 bottom-0 -left-20 animate-float" />
      <div className="orb w-64 h-64 bg-cyan/15 top-1/2 left-1/3 animate-pulse-glow" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative glass-glow rounded-3xl p-8 md:p-10 w-full max-w-xl"
      >
        <Link to="/" className="flex items-center gap-2 font-display font-semibold mb-6">
          <span className="w-8 h-8 rounded-lg bg-aurora-gradient flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </span>
          Zenvora Technology
        </Link>

        <h1 className="font-display text-2xl font-semibold mb-1">Create your account</h1>
        <p className="text-sm text-muted mb-8">Join Zenvora Technology as a student or a professional.</p>

        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <motion.div
                  animate={{
                    backgroundColor: i <= step ? 'rgba(99,102,241,1)' : 'rgba(255,255,255,0.06)',
                    scale: i === step ? 1.1 : 1,
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </motion.div>
                <span className={`text-[10px] hidden sm:block ${i <= step ? 'text-text' : 'text-muted'}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px bg-deepBrown/10 mx-2 relative overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: i < step ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-y-0 left-0 bg-aurora-gradient"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <p className="text-sm text-muted mb-2">I'm joining Zenvora as a...</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: 'student', icon: GraduationCap, title: 'Student', desc: 'Browse courses, register, and track your learning progress.' },
                    { key: 'professional', icon: Briefcase, title: 'Professional', desc: 'Teach courses, manage students, and track batches.' },
                  ].map((r) => (
                    <motion.button
                      type="button"
                      key={r.key}
                      whileHover={{ y: -3 }}
                      onClick={() => setRole(r.key)}
                      className={`text-left rounded-2xl p-5 border transition-colors ${
                        role === r.key ? 'border-primary/50 bg-primary/10' : 'border-deepBrown/10 bg-deepBrown/[0.02]'
                      }`}
                    >
                      <r.icon className={role === r.key ? 'text-primary mb-3' : 'text-muted mb-3'} size={24} />
                      <p className="font-medium mb-1">{r.title}</p>
                      <p className="text-xs text-muted leading-relaxed">{r.desc}</p>
                    </motion.button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={goNext}
                  className="w-full px-6 py-3 rounded-xl bg-aurora-gradient font-medium hover:shadow-glow transition-shadow flex items-center justify-center gap-2 mt-2"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} />
                  {role === 'student' ? (
                    <Field label="Date of Birth" name="date_of_birth" type="date" value={form.date_of_birth} onChange={handleChange} />
                  ) : (
                    <Field label="Designation" name="designation" value={form.designation} onChange={handleChange} />
                  )}
                </div>

                {role === 'student' ? (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="College" name="college" value={form.college} onChange={handleChange} />
                      <Field label="Degree" name="degree" value={form.degree} onChange={handleChange} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Department" name="department" value={form.department} onChange={handleChange} />
                      <Field label="Year of Study" name="year_of_study" value={form.year_of_study} onChange={handleChange} />
                    </div>
                    <Field label="Address" name="address" value={form.address} onChange={handleChange} />
                  </>
                ) : (
                  <Field label="Specialization" name="specialization" value={form.specialization} onChange={handleChange} />
                )}

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={goBack} className="px-5 py-3 rounded-xl glass font-medium flex items-center gap-2">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button type="button" onClick={goNext} className="flex-1 px-6 py-3 rounded-xl bg-aurora-gradient font-medium hover:shadow-glow transition-shadow flex items-center justify-center gap-2">
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <Field label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
                <Field label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={goBack} className="px-5 py-3 rounded-xl glass font-medium flex items-center gap-2">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 rounded-xl bg-aurora-gradient font-medium hover:shadow-glow transition-shadow disabled:opacity-60"
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <p className="text-sm text-muted text-center mt-6">
          Already have an account? <Link to="/login" className="text-primary font-medium">Login</Link>
        </p>
      </motion.div>
    </div>
  )
}

function Field({ label, error, ...props }) {
  return (
    <div>
      <label className="text-xs text-muted mb-1.5 block">{label}</label>
      <input {...props} className="w-full bg-deepBrown/5 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary transition-shadow" />
      {error && <p className="text-xs text-danger mt-1">{error}</p>}
    </div>
  )
}
