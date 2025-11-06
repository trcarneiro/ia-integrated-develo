import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (scrollPx / winHeightPx) * 100

      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress() // Initial call

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollProgress > 0 ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  )
}
