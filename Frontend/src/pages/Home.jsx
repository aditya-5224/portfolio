import { useEffect, useState } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import api from '../services/api'
import ThreeDCard from '../components/ThreeDCard'
import { motion } from 'framer-motion'
import GlareHover from '../components/GlareHover'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    api.get('/projects?featured=true&limit=6')
      .then(r => {
        if (mounted) {
          setFeatured(r.data.data || [])
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err.message)
        }
      })

    return () => { mounted = false }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  }

  return (

    <section className="container home">

      {/* HERO SECTION WITH GLARE */}



      <GlareHover
        glareColor="#ffffff"
        glareOpacity={0.3}
        glareAngle={-30}
        glareSize={300}
        transitionDuration={1800}
        playOnce={false}
      >
        <motion.header
          style={{
            fontSize: '3rem',
            fontWeight: '900',
            color: '#333',
            margin: 0,
            width: 'fit-content',
            height: 'fit-content',
          }}
          className="hero-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 250,
            damping: 25,
            delay: 0.2
          }}
        >
          <h1 className="hero">Aditya Yadav</h1>
          <p className="lead">
            A high-performance 3D-immersive portfolio experience built with
            React, Framer Motion & pure CSS
          </p>
        </motion.header>
      </GlareHover>



      {/* ERROR MESSAGE */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '16px 20px',
            background: 'rgba(255, 107, 157, 0.1)',
            border: '1px solid rgba(255, 107, 157, 0.3)',
            borderRadius: '8px',
            color: '#ff9fb2',
            marginBottom: '30px'
          }}
        >
          Error loading projects: {error}
        </motion.div>
      )}

      {/* FEATURED TITLE */}
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
      >
        Featured Projects
      </motion.h2>

      {/* PROJECT GRID */}
      <div className="featured-section">
        <motion.div
          className="grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featured.length === 0 && !error && (
            <p className="muted">
              No featured projects yet. Navigate to Projects section to see all.
            </p>
          )}

          {featured.map((p, idx) => (
            <ThreeDCard key={p._id} delay={idx * 0.05}>
              <div className="glass-card">
                <h3
                  className="card-title"
                  style={{ transform: 'translateZ(50px)' }}
                >
                  {p.title}
                </h3>

                {p.technologies?.length > 0 && (
                  <div className="card-tags">
                    {p.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                  </div>
                )}

                <p
                  className="card-desc"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {p.description}
                </p>

                {(p.githubUrl || p.liveUrl) && (
                  <div className="card-actions">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-btn card-btn-secondary"
                      >
                        <Github size={16} /> GitHub
                      </a>
                    )}

                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-btn card-btn-primary"
                      >
                        <ExternalLink size={16} /> Live
                      </a>
                    )}
                  </div>
                )}
              </div>
            </ThreeDCard>
          ))}
        </motion.div>
      </div>

      {/* CTA SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, delay: 0.6 }}
        style={{
          textAlign: 'center',
          padding: '80px 20px',
          marginTop: '60px'
        }}
      >
        <p
          style={{
            color: 'var(--text-secondary)',
            marginBottom: '20px'
          }}
        >
          Ready to explore more?
        </p>

        <a
          href="/projects"
          className="btn btn-primary"
          style={{ display: 'inline-block' }}
        >
          View All Projects →
        </a>
      </motion.div>
    </section>

  )
}
