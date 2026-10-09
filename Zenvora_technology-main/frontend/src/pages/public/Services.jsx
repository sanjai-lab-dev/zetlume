import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  AppWindow,
  Smartphone,
  Boxes,
  BrainCircuit,
  BarChart3,
  Cloud,
  PenTool,
  ShoppingCart,
  Wrench,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react'

const services = [
  {
    id: 'web-dev',
    icon: Globe,
    title: 'Website Development',
    tagline: 'High-performance responsive websites & landing pages.',
    description:
      'We design and build ultra-fast, responsive websites that represent your brand clearly and convert visitors into customers — from corporate sites to high-speed product landing pages.',
    features: ['Corporate & SaaS marketing sites', 'Ultra-fast Next.js & Vite performance', 'CMS & Headless integration', 'SEO-friendly semantic structure', 'Continuous maintenance & support'],
    badge: 'Popular'
  },
  {
    id: 'web-app',
    icon: AppWindow,
    title: 'Web Application Development',
    tagline: 'Scalable cloud-ready web applications.',
    description:
      'Custom web applications built to handle real enterprise workloads — analytics dashboards, internal admin systems, and multi-tenant customer-facing SaaS platforms.',
    features: ['Custom interactive dashboards', 'Multi-tenant SaaS platforms', 'API-first architecture', 'Role-based access control (RBAC)', 'Cloud-native deployment'],
    badge: 'Core Service'
  },
  {
    id: 'app-dev',
    icon: Smartphone,
    title: 'Mobile App Development',
    tagline: 'iOS and Android cross-platform apps.',
    description:
      'Native and cross-platform mobile apps built with React Native and Flutter that feel fluid, responsive, and intuitive on every device.',
    features: ['Cross-platform apps (React Native & Flutter)', 'Native iOS & Android integration', 'Real-time offline data sync', 'App Store & Play Store deployment', 'Push notifications & biometric security'],
    badge: 'High Growth'
  },
  {
    id: 'ai-ml',
    icon: BrainCircuit,
    title: 'AI & Machine Learning Innovation',
    tagline: 'Intelligent automation & custom LLM models.',
    description:
      'Practical AI integrations — automated workflows, domain-specific RAG chatbots, and predictive data tools designed to automate repetitive business tasks.',
    features: ['Domain-specific RAG chatbots', 'Workflow process automation', 'Predictive analytics & forecasting', 'LLM API integration', 'Enterprise AI strategy'],
    badge: 'Featured'
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud & DevOps Solutions',
    tagline: 'Continuous integration & 99.99% SLA hosting.',
    description:
      'Cloud architecture setup, CI/CD automation pipelines, and infrastructure migration that keeps your platform reliable, scalable, and cost-effective.',
    features: ['AWS / GCP / Vercel deployment', 'Automated CI/CD pipelines', 'Backup & disaster recovery', 'Server auto-scaling', '24/7 SLA monitoring'],
    badge: 'Infrastructure'
  },
  {
    id: 'ui-ux',
    icon: PenTool,
    title: 'UI/UX Product Design',
    tagline: 'Human-centered SaaS interface systems.',
    description:
      'User-centered design that balances modern aesthetics with usability — wireframes, clickable Figma prototypes, and scalable design systems.',
    features: ['Figma design systems & tokens', 'Interactive prototypes', 'User journey research', 'Mobile & web UI design', 'Conversion UX testing'],
    badge: 'Design'
  }
]

export default function Services() {
  const [openIdx, setOpenIdx] = useState(0)

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
            End-To-End Digital Capabilities
          </span>
          <h1 className="roboto-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight">
            Our Digital <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Services & Solutions</span>
          </h1>
          <p className="open-sans-slight text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            We provide full-spectrum engineering, product design, and cloud services to help startups and enterprise teams ship faster.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-sky-100 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 transition group-hover:bg-sky-600 group-hover:text-white shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="roboto-bold text-xl text-slate-900 mb-2 group-hover:text-sky-700 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-sky-600 mb-3">{item.tagline}</p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="border-t border-slate-100 pt-4 mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Key Deliverables:</p>
                    <ul className="space-y-2">
                      {item.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-50 border border-slate-200 py-3 text-xs font-semibold text-slate-800 transition hover:bg-sky-600 hover:text-white hover:border-sky-600 group-hover:shadow-md"
                >
                  Request Proposal <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Card */}
        <div className="rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 p-8 sm:p-12 text-white shadow-xl text-center max-w-4xl mx-auto">
          <h2 className="roboto-bold text-3xl sm:text-4xl text-white mb-3">
            Have a Custom Software Requirement?
          </h2>
          <p className="text-sky-100 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Tell us about your project specs, timeline, and goals. Our engineering team will prepare a full technical roadmap within 24 hours.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-sky-700 shadow-lg hover:bg-sky-50 transition"
          >
            Get a Custom Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
