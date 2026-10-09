import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ShieldCheck, Zap, Users, Trophy, Target, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function About() {
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
            Engineering Excellence
          </span>
          <h1 className="roboto-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight">
            About <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Zenvora Technology</span>
          </h1>
          <p className="open-sans-slight text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            We are a premier SaaS engineering agency building scalable web applications, mobile platforms, and AI systems that drive measurable business outcomes.
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-sky-100 bg-white p-8 shadow-md"
          >
            <div className="h-12 w-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="roboto-bold text-2xl text-slate-900 mb-3">Our Mission</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To empower startups and growing enterprises by shipping enterprise-grade software products in record time. We bridge high-level product strategy with clean, scalable code.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-sky-100 bg-white p-8 shadow-md"
          >
            <div className="h-12 w-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
              <Trophy className="h-6 w-6" />
            </div>
            <h2 className="roboto-bold text-2xl text-slate-900 mb-3">Our Vision</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To become the global gold standard for SaaS digital transformation — combining 3.4x release speed with 99.99% system reliability and human-centered design.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="roboto-bold text-3xl text-slate-900">What Drives Us</h2>
            <p className="text-slate-600 text-sm mt-2">The engineering principles behind every line of code we write.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <ShieldCheck className="h-8 w-8 text-sky-600 mb-4" />
              <h3 className="roboto-bold text-lg text-slate-900 mb-2">Zero Compromise Quality</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated testing, continuous integration, and strict security audits ensure your product runs flawlessly in production.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <Zap className="h-8 w-8 text-sky-600 mb-4" />
              <h3 className="roboto-bold text-lg text-slate-900 mb-2">Speed to Market</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modular architecture and 2-week agile sprints get your product from Figma design to live deployment fast.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <Users className="h-8 w-8 text-sky-600 mb-4" />
              <h3 className="roboto-bold text-lg text-slate-900 mb-2">Client Partnership</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We operate as your dedicated engineering arm with transparent communication, daily standups, and clear reporting.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl border border-sky-200 bg-gradient-to-r from-slate-900 to-indigo-950 p-8 sm:p-12 text-white text-center">
          <h2 className="roboto-bold text-3xl text-white mb-3">Ready to Work with Zenvora?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6">
            Let's discuss your project requirement, architecture, and timeline.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg hover:from-sky-600 transition"
          >
            Start a Conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  )
}
