import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import '../styles/cursor.css'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e) => {
      // Safe check for closest method
      if (e && e.target && typeof e.target.closest === 'function') {
        if (e.target.closest('.card-3d-wrapper, .btn, a[href]')) {
          setIsActive(true)
        }
      }
    }

    const handleMouseLeave = (e) => {
      if (e && e.target && typeof e.target.closest === 'function') {
        setIsActive(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [isMobile])

  // Hide cursor on mobile
  if (isMobile) return null

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: position.x,
        y: position.y,
        scale: isActive ? 1.5 : 1,
        opacity: 1
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        mass: 0.5
      }}
    />
  )
}
