import { portfolioData } from '../data/portfolioData'
import { Linkedin, Mail, ExternalLink } from 'lucide-react'

const iconMap = {
  github: Linkedin,
  linkedin: Linkedin,
  mail: Mail,
  twitter: ExternalLink
}

const BRAND_COLOR = '#FF5B6E';

export default function Home() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundColor: '#ffffff',
      overflow: 'hidden',
      display: 'flex',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
    }}>
      
      {/* ═══ LEFT SIDE - NAVIGATION + PHOTO + TITLES (60%) ═══ */}
      <div style={{
        position: 'relative',
        flex: '0 0 60%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Navigation Header */}
        <header style={{
          padding: '30px 60px',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '1px',
          color: '#333',
          zIndex: 10
        }}>
          {/* Mock Logo */}
          <div style={{ color: BRAND_COLOR, fontSize: '20px', marginRight: '20px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <circle cx="12" cy="12" r="5"/>
            </svg>
          </div>
          <span style={{ cursor: 'pointer' }}>SERVICES</span>
          <span style={{ color: BRAND_COLOR, borderBottom: `2px solid ${BRAND_COLOR}`, paddingBottom: '4px', cursor: 'pointer' }}>OFFICES</span>
          <span style={{ cursor: 'pointer' }}>TEAM</span>
          <span style={{ cursor: 'pointer' }}>PHILOSOPHY</span>
          <span style={{ cursor: 'pointer' }}>SPACES</span>
        </header>

        {/* Main Content Layout */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: '0 60px',
          position: 'relative'
        }}>
          
          {/* Left Text Block */}
          <div style={{ width: '180px', zIndex: 10, position: 'relative', top: '20px' }}>
            {/* "OUR TEAM" with line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#666', letterSpacing: '1.5px', whiteSpace: 'nowrap' }}>
                OUR TEAM
              </span>
              <div style={{ height: '1px', background: '#ccc', flex: 1 }}></div>
            </div>
            
            <p style={{ fontSize: '12px', color: '#888', margin: '0 0 8px 0', fontWeight: '500' }}>
              {portfolioData.subtitle || 'Profile'}
            </p>
            <h1 style={{ 
              fontSize: '36px', 
              color: '#333', 
              margin: '0 0 5px 0', 
              fontFamily: 'Georgia, serif',
              fontWeight: 'normal',
              lineHeight: '1.1'
            }}>
              {portfolioData.name}
            </h1>
            <h2 style={{ 
              fontSize: '20px', 
              color: '#555', 
              fontWeight: 'normal', 
              margin: '0 0 35px 0', 
              fontFamily: 'Georgia, serif' 
            }}>
              {portfolioData.title}
            </h2>
            <a href="#explore" style={{ 
              color: BRAND_COLOR, 
              textDecoration: 'none', 
              borderBottom: `1px solid ${BRAND_COLOR}`, 
              paddingBottom: '2px', 
              fontSize: '13px',
              fontWeight: '500'
            }}>
              Explore
            </a>
          </div>

          {/* Center Graphic Composition */}
          <div style={{ 
            flex: 1, 
            height: '100%', 
            position: 'relative', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginLeft: '-40px' 
          }}>
            {/* Big Main Circle */}
            <div style={{ 
              width: '420px', 
              height: '420px', 
              backgroundColor: BRAND_COLOR, 
              borderRadius: '50%', 
              position: 'absolute',
              zIndex: 1
            }} />

            {/* Dot Pattern Square */}
            <div style={{ 
              width: '100px', 
              height: '100px', 
              backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', 
              backgroundSize: '12px 12px', 
              position: 'absolute', 
              right: '15%', 
              top: '40%',
              zIndex: 2,
              opacity: 0.8
            }} />

            {/* Small Floating Circle */}
            <div style={{ 
              width: '35px', 
              height: '35px', 
              backgroundColor: BRAND_COLOR, 
              borderRadius: '50%', 
              position: 'absolute', 
              right: '12%', 
              top: '28%',
              zIndex: 2
            }} />

            {/* Left Half Circle */}
            <div style={{ 
              width: '120px', 
              height: '60px', 
              backgroundColor: BRAND_COLOR, 
              borderTopLeftRadius: '120px', 
              borderTopRightRadius: '120px', 
              position: 'absolute', 
              left: '10%', 
              top: '35%',
              zIndex: 2,
              transform: 'rotate(-90deg)'
            }} />

            {/* Profile Photo */}
            <img 
              src="/images/aditya.png" 
              alt={portfolioData.name} 
              style={{ 
                width: '340px', 
                height: '340px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                position: 'relative', 
                zIndex: 5,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }} 
            />
          </div>
        </div>
      </div>

      {/* ═══ RIGHT SIDE - SOLID COLOR + SUMMARY + DATA (40%) ═══ */}
      <div style={{
        flex: '0 0 40%',
        backgroundColor: BRAND_COLOR,
        color: '#ffffff',
        padding: '30px 60px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}>
        
        {/* Top Login Button */}
        <div style={{ 
          alignSelf: 'flex-end', 
          border: '1px solid rgba(255,255,255,0.7)', 
          padding: '10px 30px', 
          borderRadius: '30px', 
          fontSize: '11px', 
          fontWeight: '700', 
          letterSpacing: '1px', 
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.color = BRAND_COLOR;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#ffffff';
        }}>
          LOGIN
        </div>

        {/* Main Right Content */}
        <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '45px' }}>
          
          {/* Summary Section */}
          <div>
            <h2 style={{ 
              fontSize: '42px', 
              lineHeight: '1.2', 
              margin: '0 0 20px 0', 
              fontFamily: 'Georgia, serif',
              fontWeight: 'normal'
            }}>
              Your summary<br/>for the problems<br/>of this century
            </h2>
            <p style={{ 
              fontSize: '15px', 
              lineHeight: '1.6', 
              opacity: 0.9,
              margin: 0
            }}>
              {portfolioData.summary}
            </p>
          </div>

          {/* Socials Block */}
          <div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {portfolioData.socials.map((social, idx) => {
                const IconComponent = iconMap[social.icon] || ExternalLink
                return (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '45px',
                      height: '45px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
                  >
                    <IconComponent size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* LeetCode Data */}
          <div>
            <div style={{
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '28px', marginBottom: '5px' }}>🏆</div>
                <h4 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 4px 0' }}>
                  {portfolioData.leetcode.badge}
                </h4>
                <p style={{ fontSize: '12px', opacity: 0.8, margin: 0 }}>
                  {portfolioData.leetcode.badgeText}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <StatBoxLight label="Problems" value={portfolioData.leetcode.problems} />
                <StatBoxLight label="Contest Rating" value={portfolioData.leetcode.rating} />
                <StatBoxLight label="Medium" value={portfolioData.leetcode.medium} />
                <StatBoxLight label="Hard" value={portfolioData.leetcode.hard} />
              </div>

              <a
                href={portfolioData.leetcode.profile}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: '15px',
                  padding: '12px',
                  backgroundColor: '#ffffff',
                  color: BRAND_COLOR,
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                VIEW MORE
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

// Updated Stat Box Component tailored for the solid right panel
function StatBoxLight({ label, value }) {
  return (
    <div
      style={{
        padding: '12px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '6px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
      }}
    >
      <p style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#ffffff',
        margin: '0 0 4px 0'
      }}>
        {value}
      </p>
      <p style={{
        fontSize: '9px',
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '600',
        margin: 0,
        letterSpacing: '0.5px',
        textTransform: 'uppercase'
      }}>
        {label}
      </p>
    </div>
  )
}