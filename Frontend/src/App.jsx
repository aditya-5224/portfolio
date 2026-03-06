import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Achievements from './pages/Achievements'
import Certifications from './pages/Certifications'
import './styles/global.css'
import './App.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
}

const pageTransition = { 
  type: 'tween',
  duration: 0.3,
  ease: 'easeInOut'
}

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div id="app-root">
      <div className="nav-wrapper">
        <Nav />
      </div>

      <main>
        <AnimatePresence mode='wait' initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div
                className="page"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Home />
              </motion.div>
            } />
            <Route path="/projects" element={
              <motion.div
                className="page"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Projects />
              </motion.div>
            } />
            <Route path="/achievements" element={
              <motion.div
                className="page"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Achievements />
              </motion.div>
            } />
            <Route path="/certifications" element={
              <motion.div
                className="page"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Certifications />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
