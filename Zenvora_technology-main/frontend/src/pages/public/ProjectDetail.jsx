import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react'
import { getProjectById } from '../../data/projects'
import { ErrorState } from '../../components/UI'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = getProjectById(id)

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-20">
        <ErrorState message="Project not found." />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-16">
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-8"
      >
        <ArrowLeft size={15} /> Back to Projects
      </button>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-glow rounded-3xl p-8 md:p-10 mb-10 relative overflow-hidden"
      >
        <div className="orb w-72 h-72 bg-primary/20 -top-20 -right-10" />
        <div className="flex items-center justify-between mb-5 relative">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <project.icon size={26} />
          </div>
          <span className="text-xs px-3 py-1.5 rounded-full bg-deepBrown/5 text-muted">{project.type}</span>
        </div>
        <p className="text-cyan text-sm mb-2 relative">{project.category}</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-5 relative">{project.title}</h1>
        <p className="text-muted leading-relaxed relative">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-6 relative">
          {project.technologies.map((t) => (
            <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-deepBrown/5 text-muted">{t}</span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="font-display text-xl font-medium mb-4">Key highlights</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {project.highlights.map((h, i) => (
            <motion.div
              key={h}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-2.5 glass rounded-xl p-4"
            >
              <CheckCircle2 size={17} className="text-success mt-0.5 shrink-0" />
              <span className="text-sm text-muted">{h}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-7 mb-10"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} className="text-accent" />
          <h2 className="font-display text-lg font-medium">Outcome</h2>
        </div>
        <p className="text-sm text-muted leading-relaxed">{project.outcome}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-glow rounded-3xl p-10 text-center relative overflow-hidden"
      >
        <div className="orb w-64 h-64 bg-cyan/20 -bottom-20 -left-10" />
        <h2 className="font-display text-xl font-semibold mb-3 relative">Have a similar idea in mind?</h2>
        <p className="text-muted max-w-md mx-auto mb-6 relative">
          Let's talk about what a project like this could look like for your business.
        </p>
        <Link to="/contact" className="px-6 py-3 rounded-xl bg-aurora-gradient font-medium hover:shadow-glow transition-shadow relative inline-block">
          Start a Project
        </Link>
      </motion.div>
    </div>
  )
}
