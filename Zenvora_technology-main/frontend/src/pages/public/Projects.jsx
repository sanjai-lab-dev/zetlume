import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { projects } from '../../data/projects'

export default function Projects() {
  const navigate = useNavigate()

  return (
    <div className="max-w-6xl mx-auto px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14 relative"
      >
        <div className="orb w-72 h-72 bg-accent/20 -top-20 left-1/2 -translate-x-1/2" />
        <h1 className="font-display text-4xl font-semibold mb-4 relative">Transforming ideas into digital experiences</h1>
        <p className="text-muted max-w-2xl mx-auto relative">
          Our projects and initiatives, clearly labeled by status for full transparency. Click a
          project to see the complete write-up.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -5, borderColor: 'rgba(99,102,241,0.4)' }}
            onClick={() => navigate(`/projects/${p.id}`)}
            className="glass rounded-2xl p-7 cursor-pointer border border-transparent transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <p.icon size={20} />
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-deepBrown/5 text-muted">{p.type}</span>
            </div>
            <p className="text-xs text-cyan mb-1">{p.category}</p>
            <h3 className="font-display text-lg font-medium mb-2">{p.title}</h3>
            <p className="text-sm text-muted leading-relaxed mb-4">{p.summary}</p>
            <span className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View full project <ArrowRight size={14} />
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
