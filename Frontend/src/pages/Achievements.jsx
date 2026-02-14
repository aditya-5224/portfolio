import { useEffect, useState } from 'react'
import ElectricBorder from '../components/ElectricBorder'
import { motion } from 'framer-motion'
import api from '../services/api'
import { getLinkIcon } from '../utils/getLinkIcon'

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

  return (
    <section style={{ paddingTop: '80px', paddingBottom: '80px', overflow: 'visible' }}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            fontSize: '18px',
            color: '#ffffff',
            fontWeight: '500'
          }}
        >
          Loading achievements...
        </div>
      ) : items.length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            fontSize: '18px',
            color: '#aaaaaa',
            fontWeight: '500'
          }}
        >
          No achievements found.
        </div>
      ) : (
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            padding: '60px 20px',
            overflow: 'visible',
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          {items.map((achievement, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              style={{ display: 'flex', height: '100%' }}
            >
              <ElectricBorder
                color="#ff006e"
                speed={1}
                chaos={0.12}
                thickness={2}
                borderRadius={16}
                style={{
                  width: '100%',
                  minHeight: '400px',
                  borderRadius: '16px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    padding: '24px',
                    background: 'linear-gradient(135deg, #3a0a2a 0%, #2a0a1e 100%)',
                    borderRadius: '14px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {/* Badge */}
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '1.2px',
                      color: '#888888',
                      marginBottom: '16px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {achievement.category?.toUpperCase() || 'ACHIEVEMENT'}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#ffffff',
                      marginBottom: '12px',
                      lineHeight: '1.2',
                      margin: '0 0 12px 0'
                    }}
                  >
                    {achievement.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#aaaaaa',
                      marginBottom: 'auto',
                      lineHeight: '1.6',
                      flex: 1,
                      margin: '0 0 24px 0'
                    }}
                  >
                    {achievement.description || 'No description available.'}
                  </p>

                  {/* Date */}
                  {achievement.date && new Date(achievement.date).getFullYear() !== 1970 && (
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
                      📅 {new Date(achievement.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}

                  {/* External Link Icon */}
                  {achievement.link && (() => {
                    const IconComponent = getLinkIcon(achievement.link)
                    return (
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '40px',
                          height: '40px',
                          background: 'rgba(255, 0, 110, 0.1)',
                          color: '#ff006e',
                          border: '1px solid #ff006e',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        title="View Achievement"
                      >
                        <IconComponent size={18} />
                      </a>
                    )
                  })()}
                </div>
              </ElectricBorder>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}
