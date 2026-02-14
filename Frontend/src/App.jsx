import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Nav from './components/Nav'
import PixelSnow from './components/PixelSnow'
import './components/PixelSnow.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Achievements from './pages/Achievements'
import Certifications from './pages/Certifications'
import './styles/global.css'
import './App.css'

const pageVariants = {
  initial: { opacity: 0, y: 20, z: -50 },
  in: { opacity: 1, y: 0, z: 0 },
  out: { opacity: 0, y: -20, z: -50 }
}

const pageTransition = { type: 'spring', stiffness: 300, damping: 30 }

function App() {
  const location = useLocation()
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50])

  return (
    <div id="app-root">
      {/* Global PixelSnow Background Layer */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', width: '100vw', height: '100vh', background: '#020617' }}>
        <PixelSnow
          color="#ffffff"
          flakeSize={0.018}
          minFlakeSize={1.25}
          pixelResolution={440}
          speed={2}
          density={0.3}
          direction={270}
          brightness={1.6}
          depthFade={6}
          variant="square"
        />
      </div>

      <motion.div 
        style={{ y: parallaxY }}
        className="parallax-layer"
      >
        <Nav />
      </motion.div>

      <main style={{ perspective: '1200px', overflowX: 'hidden' }}>
        <AnimatePresence mode='wait'>
          <motion.div
            className="page"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            key={location.pathname}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/certifications" element={<Certifications />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
