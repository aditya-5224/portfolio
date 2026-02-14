import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { motion, AnimatePresence } from 'framer-motion'
import GlareHover from '../components/GlareHover'
import Folder from '../components/Folder'
import { getLinkIcon } from '../utils/getLinkIcon'

/* ─── Paper Card (rendered INSIDE the folder paper) ─── */
function PaperCard({ title, subtitle, accentColor, link }) {
  const IconComponent = link ? getLinkIcon(link) : null

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(145deg, rgba(18,12,38,0.97) 0%, rgba(10,8,26,0.97) 100%)`,
        borderRadius: 'inherit',
        padding: '8px 6px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      {/* Accent glow top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
      }} />

      <h4 style={{
        fontSize: '7px', fontWeight: '800', color: '#fff',
        margin: '0 0 3px 0', lineHeight: '1.2',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        maxWidth: '100%', letterSpacing: '0.2px'
      }}>
        {title}
      </h4>

      <p style={{
        fontSize: '5px', color: '#aaa', margin: 0,
        lineHeight: '1.3', display: '-webkit-box',
        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        maxWidth: '100%'
      }}>
        {subtitle || ''}
      </p>

      {IconComponent && (
        <div style={{
          position: 'absolute', bottom: '4px', right: '4px',
          color: accentColor, opacity: 0.8
        }}>
          <IconComponent size={6} />
        </div>
      )}
    </div>
  )
}

/* ─── Folder Section ─── */
function FolderSection({ title, accentColor, items, folderColor, renderPaperCard, navPath, delay = 0 }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const sectionRef = useRef(null)

  // Auto-close folder when scrolled out of view
  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isOpen) {
          setIsOpen(false)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [isOpen])

  // Build folder items array: fill with card content, leave null for remaining (white paper)
  // Paper positions when open: 1=left, 2=right, 3=center
  // If only 1 item → place it at center (slot 3)
  // If 2 items → left (slot 1) + center (slot 3)
  // If 3 items → fill all
  const folderItems = [null, null, null]
  if (items.length === 1) {
    folderItems[2] = renderPaperCard(items[0]) // center
  } else if (items.length === 2) {
    folderItems[0] = renderPaperCard(items[0]) // left
    folderItems[2] = renderPaperCard(items[1]) // center
  } else if (items.length >= 3) {
    folderItems[0] = renderPaperCard(items[0])
    folderItems[1] = renderPaperCard(items[1])
    folderItems[2] = renderPaperCard(items[2])
  }

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 100, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ type: 'spring', stiffness: 140, damping: 22, delay }}
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        perspective: '1200px'
      }}
    >
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.1, type: 'spring', stiffness: 200 }}
        style={{
          fontSize: '2.2rem', fontWeight: '800', color: accentColor,
          margin: '0 0 8px 0', letterSpacing: '-0.02em', textAlign: 'center',
          textTransform: 'uppercase', lineHeight: 1.1
        }}
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2 }}
        style={{
          fontSize: '13px', color: '#555', margin: '0 0 40px 0',
          fontStyle: 'italic', textAlign: 'center'
        }}
      >
        {isOpen ? 'Click folder to close' : 'Click folder to explore'}
      </motion.p>

      {/* Centered Folder */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Folder
          color={folderColor}
          size={2.5}
          items={folderItems}
          isOpen={isOpen}
          onToggle={(open) => setIsOpen(open)}
        />
      </div>

      {/* View All button – appears below when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            style={{ marginTop: '30px', textAlign: 'center' }}
          >
            <button
              onClick={() => navigate(navPath)}
              style={{
                background: 'transparent',
                border: `1px solid ${accentColor}55`,
                color: accentColor,
                padding: '10px 28px',
                borderRadius: '24px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.target.style.background = `${accentColor}18`
                e.target.style.borderColor = accentColor
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent'
                e.target.style.borderColor = `${accentColor}55`
              }}
            >
              View All →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Home Page ─── */
export default function Home() {
  const [projects, setProjects] = useState([])
  const [achievements, setAchievements] = useState([])
  const [certifications, setCertifications] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true

    Promise.allSettled([
      api.get('/projects?limit=6'),
      api.get('/achievements?limit=6'),
      api.get('/certifications?limit=6')
    ]).then(([projRes, achRes, certRes]) => {
      if (!mounted) return
      if (projRes.status === 'fulfilled') setProjects(projRes.value.data.data || [])
      if (achRes.status === 'fulfilled') setAchievements(achRes.value.data.data || [])
      if (certRes.status === 'fulfilled') setCertifications(certRes.value.data.data || [])
    }).catch(err => {
      if (mounted) setError(err.message)
    })

    return () => { mounted = false }
  }, [])

  return (
    <section className="container home" style={{ overflow: 'visible' }}>

      {/* ─── HERO ─── */}
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
            fontSize: '3rem', fontWeight: '900', color: '#333',
            margin: 0, width: 'fit-content', height: 'fit-content'
          }}
          className="hero-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 25, delay: 0.2 }}
        >
          <h1 className="hero">Aditya Yadav</h1>
          <p className="lead">
            A high-performance 3D-immersive portfolio experience built with
            React, Framer Motion & pure CSS
          </p>
        </motion.header>
      </GlareHover>

      {/* ─── ERROR ─── */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '16px 20px',
            background: 'rgba(255, 107, 157, 0.1)',
            border: '1px solid rgba(255, 107, 157, 0.3)',
            borderRadius: '8px', color: '#ff9fb2', marginBottom: '30px'
          }}
        >
          Error loading data: {error}
        </motion.div>
      )}

      {/* ─── FOLDER SECTIONS ─── */}
      <div style={{ marginTop: '60px' }}>

        {/* Projects Folder */}
        <FolderSection
          title="Projects"
          accentColor="#ff80f4"
          folderColor="#ff80f4"
          items={projects}
          navPath="/projects"
          delay={0.1}
          renderPaperCard={(p) => (
            <PaperCard
              title={p.title}
              subtitle={p.subtitle || p.description}
              accentColor="#ff80f4"
              link={p.link || p.githubUrl}
            />
          )}
        />

        {/* Achievements Folder */}
        <FolderSection
          title="Achievements"
          accentColor="#ff006e"
          folderColor="#ff006e"
          items={achievements}
          navPath="/achievements"
          delay={0.15}
          renderPaperCard={(a) => (
            <PaperCard
              title={a.title}
              subtitle={a.description}
              accentColor="#ff006e"
              link={a.link}
            />
          )}
        />

        {/* Certifications Folder */}
        <FolderSection
          title="Certifications"
          accentColor="#00f5ff"
          folderColor="#00f5ff"
          items={certifications}
          navPath="/certifications"
          delay={0.2}
          renderPaperCard={(c) => (
            <PaperCard
              title={c.name}
              subtitle={`Issued by ${c.issuer}`}
              accentColor="#00f5ff"
              link={c.credentialUrl}
            />
          )}
        />

      </div>
    </section>
  )
}
