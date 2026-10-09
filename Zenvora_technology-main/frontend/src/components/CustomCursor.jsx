import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// A soft, elegant magnetic cursor: a small solid dot with a trailing gold ring.
// The ring lags slightly behind the dot (via spring physics) for a premium feel,
// and both scale up when hovering any interactive element (a, button, [role=button], input).
// Automatically disabled on touch devices via the CSS media query in index.css,
// and respects prefers-reduced-motion by rendering nothing.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useSpring(dotX, { stiffness: 300, damping: 28, mass: 0.5 })
  const ringY = useSpring(dotY, { stiffness: 300, damping: 28, mass: 0.5 })

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reducedMotion) return
    setEnabled(true)

    const handleMove = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleOver = (e) => {
      const interactive = e.target.closest('a, button, input, select, textarea, [role="button"], .cursor-hover')
      setHovering(!!interactive)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: hovering ? 0 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 1.8 : 1,
          opacity: visible ? 1 : 0,
          borderColor: hovering ? 'rgba(212,175,106,0.95)' : 'rgba(212,175,106,0.7)',
          backgroundColor: hovering ? 'rgba(212,175,106,0.12)' : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
