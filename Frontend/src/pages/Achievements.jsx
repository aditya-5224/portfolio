import { useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'
import api from '../services/api'
import Card from '../components/Card'
import ThreeDCard from '../components/ThreeDCard'
import { motion } from 'framer-motion'

export default function Achievements() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    api.get('/achievements?limit=12')
      .then(res => {
        if (!mounted) return
        setItems(res.data.data || [])
        setLoading(false)
      })
      .catch(err => {
        if (mounted) {
          console.error('Achievements fetch error:', err)
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
        Achievements
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
          <p className="muted">No achievements to display yet.</p>
        )}
        {items.map((achievement, idx) => (
          <motion.div key={achievement._id} variants={itemVariants}>
            <ThreeDCard delay={idx * 0.05}>
              <Card
                title={achievement.title}
                description={achievement.organization}
                color="#ff006e"
              >
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                  {achievement.description}
              </p>
              {achievement.date && (
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
                  📅 {new Date(achievement.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
            </Card>
            </ThreeDCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
