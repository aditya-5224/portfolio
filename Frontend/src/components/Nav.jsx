import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../styles/nav.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/certifications', label: 'Certifications' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
}

export default function Nav() {
  return (
    <nav className="top-nav">
      <motion.div 
        className="brand"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
      >
        <span className="logo-dot" />
        <span className="brand-text">Portfolio</span>
      </motion.div>

      <motion.div
        className="links"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {navLinks.map((l) => (
          <motion.div key={l.to} variants={itemVariants}>
            <NavLink to={l.to} className={({ isActive }) => isActive ? 'link active' : 'link'}>
              {l.label}
            </NavLink>
          </motion.div>
        ))}
      </motion.div>
    </nav>
  )
}
