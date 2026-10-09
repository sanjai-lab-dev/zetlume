import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Globe,
  Bot,
  Code2,
  Cloud,
  BarChart3,
  Smartphone,
  Sparkles,
  MapPin,
  GraduationCap,
  Layers,
  Building2,
  Tag,
  CheckCircle2,
  Rocket
} from 'lucide-react'

// Stats Data
const stats = [
  { value: '6', label: 'Technology Courses', icon: GraduationCap },
  { value: '8+', label: 'Learning Focus Areas', icon: Layers },
  { value: '8', label: 'Industries Served', icon: Building2 },
  { value: 'Coimbatore', label: 'Based In', icon: MapPin }
]

// Services Data ("What we build")
const services = [
  {
    title: 'Website Development',
    desc: 'Modern responsive websites.',
    icon: Globe,
    gradient: 'from-sky-500 to-blue-600',
    link: '/services'
  },
  {
    title: 'AI Solutions',
    desc: 'AI-powered applications and automation.',
    icon: Bot,
    gradient: 'from-blue-600 to-indigo-600',
    link: '/services'
  },
  {
    title: 'Custom Software',
    desc: 'Business-focused software solutions.',
    icon: Code2,
    gradient: 'from-indigo-600 to-purple-600',
    link: '/services'
  },
  {
    title: 'Cloud Solutions',
    desc: 'Cloud deployment and infrastructure.',
    icon: Cloud,
    gradient: 'from-sky-600 to-teal-600',
    link: '/services'
  },
  {
    title: 'Data Analytics',
    desc: 'Data-driven dashboards and insights.',
    icon: BarChart3,
    gradient: 'from-teal-500 to-emerald-600',
    link: '/services'
  },
  {
    title: 'Mobile Apps',
    desc: 'Android and cross-platform applications.',
    icon: Smartphone,
    gradient: 'from-blue-500 to-cyan-600',
    link: '/services'
  }
]

export default function Home() {
  return (
    <div className="bg-[#f8fbff] text-slate-900 overflow-x-hidden font-sans">

      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
        {/* Background glow ambient circles */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-200/50 blur-3xl"></div>
          <div className="absolute right-10 top-1/3 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl"></div>
          <div className="absolute left-10 bottom-10 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Location & Tag Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur-sm mb-6"
            >
              <MapPin className="h-3.5 w-3.5 text-sky-600 shrink-0" />
              <span>Coimbatore, Tamil Nadu · IT Services & Technology Learning</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="roboto-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight"
            >
              Transforming Ideas Into
              <span className="block bg-gradient-to-r from-sky-600 via-blue-600 to-teal-500 bg-clip-text text-transparent mt-1">
                Powerful Digital Solutions
              </span>
            </motion.h1>

            {/* Paragraph Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
            >
              Zenvora Technology empowers students, professionals and businesses with modern technology solutions, industry-focused training and innovative digital experiences.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:from-sky-700 hover:via-blue-700 hover:to-indigo-700"
              >
                Explore Courses
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl border border-sky-300 bg-white px-7 py-3.5 text-sm font-semibold text-sky-700 shadow-sm transition hover:bg-sky-50 hover:border-sky-400"
              >
                Get Started
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl border border-slate-300 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-white hover:text-slate-900 hover:border-slate-400"
              >
                Talk to Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. STATS SECTION */}
      {/* ============================================================ */}
      <section className="relative py-12 bg-white border-y border-sky-100/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="p-6 rounded-2xl border border-slate-100 bg-slate-50/60 shadow-sm transition hover:shadow-md hover:border-sky-200"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600 mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="roboto-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-600">
                    {item.label}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. WHAT WE BUILD (SERVICES SECTION) */}
      {/* ============================================================ */}
      <section id="services" className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              <Sparkles className="h-3.5 w-3.5 text-sky-500" />
              End-to-End Technology Services
            </span>
            <h2 className="roboto-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mt-3">
              What we build
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              End-to-end technology services for startups and growing businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv, idx) => {
              const Icon = srv.icon
              return (
                <motion.div
                  key={srv.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-sky-300 flex flex-col justify-between"
                >
                  <div>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${srv.gradient} text-white shadow-md mb-5 group-hover:scale-105 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="roboto-bold text-xl text-slate-900 mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {srv.desc}
                    </p>
                  </div>
                  <Link
                    to={srv.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 transition"
                  >
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* View All Services Button */}
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 text-sm font-semibold shadow-md transition"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. COURSE OFFER — LIMITED TIME */}
      {/* ============================================================ */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white overflow-hidden">
        {/* Decorative background glow */}
        <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl"></div>
        <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl border border-sky-500/30 bg-white/5 backdrop-blur-xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 px-3.5 py-1 text-xs font-bold text-sky-300 border border-sky-400/30 mb-3">
                <Tag className="h-3.5 w-3.5 text-sky-400" />
                Course Offer — Limited Time
              </span>
              <h2 className="roboto-bold text-3xl sm:text-4xl text-white mt-1">
                Flat ₹300 off on every Zenvora Learning course
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                Full Stack Development, Cyber Security, AI & Machine Learning, Cloud & DevOps, Data Science and Mobile App Development — the discount applies automatically at registration, no coupon needed.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-sky-300">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Instant ₹300 Savings
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Applicable on All Programs
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Certificate Included
                </span>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto text-center">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center w-full sm:w-auto rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-8 py-4 text-base font-bold text-white shadow-xl hover:from-sky-400 hover:to-indigo-400 transition hover:scale-105 transform"
              >
                Grab the Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BUILD. LEARN. INNOVATE. (CTA SECTION) */}
      {/* ============================================================ */}
      <section className="relative py-20 lg:py-28 bg-white border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-sky-100 bg-gradient-to-b from-sky-50/60 to-white p-8 sm:p-14 shadow-lg"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md mb-4">
              <Rocket className="h-7 w-7" />
            </div>
            <h2 className="roboto-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Build. Learn. Innovate.
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Technology solutions and career-focused learning from Zenvora Technology.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:from-sky-700 hover:to-indigo-700 transition"
              >
                Explore Courses
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 hover:border-slate-400"
              >
                Start Learning
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
