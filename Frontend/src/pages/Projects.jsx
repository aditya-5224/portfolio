import { useState, useEffect } from 'react'
import ElectricBorder from '../components/ElectricBorder'
import { motion } from 'framer-motion'
import api from '../services/api'

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      try {
        const response = await api.get(`/projects?page=${currentPage}&limit=8`)
        if (response.data && response.data.data) {
          setItems(response.data.data)
          setTotalPages(response.data.totalPages || 1)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [currentPage])

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
          Loading projects...
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
          No projects found.
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
          {items.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              style={{ display: 'flex', height: '100%' }}
            >
              <ElectricBorder
                color="#ff80f4"
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
                    background: 'linear-gradient(135deg, #2a0a3a 0%, #1a0a2e 100%)',
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
                    {project.badge || 'FEATURED'}
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
                    {project.title}
                  </h3>

                  {/* Subtitle */}
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
                    {project.subtitle || project.description || 'No description available.'}
                  </p>

                  {/* Bottom Section */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      marginTop: 'auto'
                    }}
                  >
                    {/* Live Button */}
                    <button
                      style={{
                        padding: '8px 16px',
                        background: '#1a1a1a',
                        color: '#888888',
                        border: '1px solid #333333',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        width: 'fit-content'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = '#ff80f4'
                        e.target.style.color = '#ff80f4'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = '#333333'
                        e.target.style.color = '#888888'
                      }}
                    >
                      Live {project.version || 'v1.0'}
                    </button>

                    {/* Get Started Button */}
                    <a
                      href={project.link || '#'}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '12px 24px',
                        background: '#ffffff',
                        color: '#000000',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 20px rgba(255, 128, 244, 0.3)',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.boxShadow = '0 0 30px rgba(255, 128, 244, 0.6)'
                        e.target.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.boxShadow = '0 0 20px rgba(255, 128, 244, 0.3)'
                        e.target.style.transform = 'translateY(0)'
                      }}
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </ElectricBorder>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '60px'
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: '8px 12px',
                background: currentPage === page ? '#ff80f4' : '#1a1a1a',
                color: currentPage === page ? '#000000' : '#ffffff',
                border: '1px solid #ff80f4',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                fontSize: '12px'
              }}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}