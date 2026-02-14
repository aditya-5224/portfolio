import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useMousePosition } from '../hooks/useMousePosition'

export default function ThreeDCard({ children, delay = 0 }) {
  const ref = useRef(null)
  const mousePosition = useMousePosition()
  
  const xRaw = useMotionValue(0)
  const yRaw = useMotionValue(0)
  
  // Stiffness and Damping are key to stopping the "jumpy" feel
  const rotateX = useSpring(xRaw, { stiffness: 200, damping: 25 })
  const rotateY = useSpring(yRaw, { stiffness: 200, damping: 25 })
  
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!ref.current || isMobile) return
    const rect = ref.current.getBoundingClientRect()
    // Subtle rotation (max 12 degrees)
    const rotateXValue = ((mousePosition.y - (rect.top + rect.height / 2)) / rect.height) * -12
    const rotateYValue = ((mousePosition.x - (rect.left + rect.width / 2)) / rect.width) * 12
    xRaw.set(rotateXValue)
    yRaw.set(rotateYValue)
  }, [mousePosition, xRaw, yRaw, isMobile])

  return (
    <motion.div
      ref={ref}
      onMouseLeave={() => { xRaw.set(0); yRaw.set(0); }}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1200px',
        width: '100%',
        height: '100%',
        overflow: 'visible'
      }}
      // Scale handled here prevents the CSS size-change bug
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}