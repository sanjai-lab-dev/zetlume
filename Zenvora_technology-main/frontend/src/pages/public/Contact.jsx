import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Sparkles, Clock, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    budget: '$5,000 - $10,000',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    toast.success('Thank you! Your quote request has been received. Our team will contact you within 24 hours.')
  }

  return (
    <div className="bg-[#f8fbff] py-28 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="open-sans-semibold inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-sky-700 shadow-sm mb-4">
            <Sparkles className="h-3.5 w-3.5 text-sky-500" />
            Get A Fast Quote
          </span>
          <h1 className="roboto-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight">
            Let’s Build Something <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Extraordinary</span>
          </h1>
          <p className="open-sans-slight text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Have a project in mind or need a quote? Fill out the form below and our technical architects will prepare a proposal within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-sky-100 bg-white p-8 shadow-md">
              <h3 className="roboto-bold text-2xl text-slate-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="roboto-bold text-sm text-slate-900">Office Location</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Coimbatore, Tamil Nadu, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="roboto-bold text-sm text-slate-900">Email Us</h4>
                    <a href="mailto:zenvoratechnologyinfo@gmail.com" className="text-xs text-sky-600 hover:underline mt-1 block font-medium">
                      zenvoratechnologyinfo@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="roboto-bold text-sm text-slate-900">Call & WhatsApp</h4>
                    <a href="tel:+919025168077" className="text-xs text-sky-600 hover:underline mt-1 block font-medium">
                      +91 9025168077
                    </a>
                    <a href="https://wa.me/919042938077" target="_blank" rel="noreferrer" className="text-xs text-emerald-600 hover:underline block font-medium">
                      +91 9042938077 (WhatsApp)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="roboto-bold text-sm text-slate-900">Response SLA</h4>
                    <p className="text-xs text-slate-600 mt-1">Under 24 hours guaranteed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee Box */}
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6">
              <div className="flex items-center gap-3 text-emerald-800 font-semibold text-sm mb-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                NDA Protected Consultation
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                All communications and project specifications submitted are strictly protected under enterprise confidentiality.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-sky-100 bg-white p-8 sm:p-10 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="roboto-bold text-2xl text-slate-900 mb-2">Proposal Request Received!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you for reaching out to Zenvora Technology. One of our solution architects will review your details and send a customized proposal shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option>Web Development</option>
                        <option>App Development</option>
                        <option>AI / ML Integration</option>
                        <option>Cloud Architecture</option>
                        <option>UI/UX Product Design</option>
                        <option>Full SaaS MVP Build</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Project Overview & Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your project goals, key features, target launch timeline..."
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:from-sky-700 hover:to-indigo-700 transition"
                  >
                    Submit Project Inquiry <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
