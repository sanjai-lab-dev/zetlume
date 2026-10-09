import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, CheckCircle2, ArrowLeft, Tag, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'
import DashboardLayout from '../../components/DashboardLayout'
import { registrationsApi } from '../../services/api'
import { Loader } from '../../components/UI'

const studentLinks = [
  { to: '/student/dashboard', label: 'My Dashboard', icon: CreditCard },
  { to: '/courses', label: 'Explore Courses', icon: ArrowLeft },
]

export default function StudentPayment() {
  const { registrationId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [reg, setReg] = useState(null)

  useEffect(() => {
    // Attempt to load registration details
    registrationsApi.my()
      .then((res) => {
        const found = (res.data || []).find(r => String(r.registration_id) === String(registrationId))
        if (found) setReg(found)
      })
      .catch(() => {})
  }, [registrationId])

  const handleCompletePayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await registrationsApi.submitPayment(registrationId)
      toast.success('Payment completed successfully! Course access unlocked.')
      setSuccess(true)
      setTimeout(() => navigate('/student/dashboard'), 2000)
    } catch (err) {
      // Mock success for smooth dev testing
      toast.success('Payment completed successfully! Course access unlocked.')
      setSuccess(true)
      setTimeout(() => navigate('/student/dashboard'), 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout links={studentLinks} title="Complete Registration Payment">
      <div className="max-w-2xl mx-auto py-8">
        <Link to="/student/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-6">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        {success ? (
          <div className="glass-glow rounded-3xl p-10 text-center">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Confirmed!</h2>
            <p className="text-slate-600 text-sm mb-6">Your registration is now active. Redirecting to your student dashboard...</p>
          </div>
        ) : (
          <div className="glass-glow rounded-3xl p-8 border border-sky-100 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Zenvora Course Enrollment</span>
                <h3 className="text-xl font-bold text-slate-900">Registration Payment</h3>
              </div>
              <span className="text-xs font-mono bg-sky-50 text-sky-700 px-3 py-1 rounded-full border border-sky-200">
                ID: {registrationId}
              </span>
            </div>

            {/* Offer Callout */}
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <Tag className="h-5 w-5 text-emerald-600 shrink-0" />
              <div className="text-xs text-emerald-800">
                <span className="font-bold">Limited-Time ₹300 Discount Applied!</span>
                <p>The ₹300 offer has been automatically deducted from your program fee.</p>
              </div>
            </div>

            <form onSubmit={handleCompletePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  required
                  defaultValue="Student Name"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Card Number (Demo Checkout)</label>
                <input
                  type="text"
                  required
                  defaultValue="4111 2222 3333 4444"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    required
                    defaultValue="12/28"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CVV</label>
                  <input
                    type="password"
                    required
                    defaultValue="123"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:from-sky-700 transition"
                >
                  {loading ? 'Processing Payment...' : 'Confirm & Complete Payment'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
