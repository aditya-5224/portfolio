import { useEffect, useState } from 'react'
import ElectricBorder from '../components/ElectricBorder'
import { motion } from 'framer-motion'
import api from '../services/api'
import { getLinkIcon } from '../utils/getLinkIcon'

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
          Loading certifications...
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
          No certifications found.
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
          {items.map((certification, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              style={{ display: 'flex', height: '100%' }}
            >
              <ElectricBorder
                color="#00f5ff"
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
                    background: 'linear-gradient(135deg, #0a2a3a 0%, #0a1a2e 100%)',
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
                    CERTIFICATION
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
                    {certification.name}
                  </h3>

                  {/* Issuer */}
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#aaaaaa',
                      marginBottom: '12px'
                    }}
                  >
                    Issued by: {certification.issuer}
                  </p>

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
                    {certification.description || 'Professional certification in ' + certification.issuer}
                  </p>
                  {/* Date */}
                  {certification.dateObtained && new Date(certification.dateObtained).getFullYear() !== 1970 && (
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
                      📅 {new Date(certification.dateObtained).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}

                  {/* External Link Icon */}
                  {certification.credentialUrl && (() => {
                    const IconComponent = getLinkIcon(certification.credentialUrl)
                    return (
                      <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '40px',
                          height: '40px',
                          background: 'rgba(0, 245, 255, 0.1)',
                          color: '#00f5ff',
                          border: '1px solid #00f5ff',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        title="View Credential"
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
