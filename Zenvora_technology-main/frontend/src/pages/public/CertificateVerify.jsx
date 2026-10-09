import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, ShieldX } from 'lucide-react'
import { certificatesApi } from '../../services/api'
import { Loader } from '../../components/UI'

export default function CertificateVerify() {
  const { id } = useParams()
  const [cert, setCert] = useState(null)
  const [loading, setLoading] = useState(!!id)
  const [notFound, setNotFound] = useState(false)
  const [inputId, setInputId] = useState(id || '')

  const verify = (verificationId) => {
    setLoading(true)
    setNotFound(false)
    setCert(null)
    certificatesApi.verify(verificationId)
      .then((res) => setCert(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => { if (id) verify(id) }, [id])

  return (
    <div className="max-w-xl mx-auto px-5 py-20 relative overflow-hidden">
      <div className="orb w-72 h-72 bg-cyan/15 -top-20 left-1/2 -translate-x-1/2" />
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl font-semibold text-center mb-8 relative"
      >
        Verify Certificate
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3 mb-8 relative"
      >
        <input
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Enter verification ID"
          className="flex-1 bg-deepBrown/5 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary transition-shadow"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => verify(inputId)}
          className="px-5 py-3 rounded-xl bg-aurora-gradient font-medium hover:shadow-glow transition-shadow"
        >
          Verify
        </motion.button>
      </motion.div>

      {loading && <Loader label="Verifying..." />}

      <AnimatePresence mode="wait">
        {!loading && notFound && (
          <motion.div
            key="notfound"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="glass rounded-2xl p-8 text-center"
          >
            <motion.div initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
              <ShieldX className="text-danger mx-auto mb-3" size={32} />
            </motion.div>
            <p className="text-muted">Certificate not found. Please check the verification ID.</p>
          </motion.div>
        )}

        {!loading && cert && (
          <motion.div
            key="found"
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15 }}
            className="glass-glow rounded-2xl p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
            >
              <ShieldCheck className="text-success mx-auto mb-3" size={32} />
            </motion.div>
            <p className="text-sm text-muted mb-1">This certificate is valid</p>
            <h2 className="font-display text-xl font-semibold mb-4">{cert.student_name}</h2>
            <p className="text-muted text-sm mb-1">has successfully completed</p>
            <p className="font-medium mb-4">{cert.course_name}</p>
            <p className="text-xs text-muted">Certificate ID: {cert.certificate_id}</p>
            <p className="text-xs text-muted">Issued by: {cert.professional}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
