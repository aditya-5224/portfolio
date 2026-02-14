import { useEffect, useState } from 'react'
import { Award, ExternalLink } from 'lucide-react'
import api from '../services/api'
import Card from '../components/Card'
import ThreeDCard from '../components/ThreeDCard'
import { motion } from 'framer-motion'

export default function Certifications() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    api.get('/certifications?limit=12')
      .then(res => {
        if (!mounted) return
        setItems(res.data.data || [])
        setLoading(false)
      })
      .catch(err => {
        if (mounted) {
          console.error('Certifications fetch error:', err)
          setLoading(false)
        }
      })
    return () => { mounted = false }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  }

  return (
    <section className="container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Certifications
      </motion.h2>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="loading" style={{ margin: '0 auto' }} />
        </div>
      )}

      <motion.div 
        className="grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.length === 0 && !loading && (
          <p className="muted">No certifications to display yet.</p>
        )}
        {items.map((certification, idx) => (
          <motion.div key={certification._id} variants={itemVariants}>
            <ThreeDCard delay={idx * 0.05}>
              <Card
                title={certification.title}
                description={certification.issuer}
                color="#00f5ff"
              >
                {certification.description && (
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
                  {certification.description}
                </p>
              )}
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
                📅 {new Date(certification.dateObtained).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              {certification.credentialUrl && (
                <a 
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-btn card-btn-secondary"
                  style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <ExternalLink size={16} style={{ marginRight: '6px' }} /> View Credential
                </a>
              )}
              </Card>
            </ThreeDCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
