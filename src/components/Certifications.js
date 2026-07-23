import React from 'react';
import { motion } from 'motion/react';

// Images mapping for the real company logos
const companyLogos = {
  'McKinsey & Company': '/mckinsey_logo.png',
  'JPMorgan Chase & Co. (Forage)': '/jpmorgan_logo.png',
  'HackerRank': '/hackerrank_logo.png',
};

// Deloitte gets its own inline SVG logo (the previous version the user liked)
const deloitteSvg = (
  <svg viewBox="0 0 100 35" style={{ width: '100%', height: '100%' }} fill="white">
    <text x="5" y="24" fontFamily="ui-sans-serif, system-ui" fontSize="18" fontWeight="bold" letterSpacing="-0.5">Deloitte</text>
    <circle cx="83" cy="21" r="3.5" fill="#86bc25" />
  </svg>
);

const dots = [
  { top: '15%', left: '8%', size: 6, color: 'rgba(255,122,0,0.5)', dur: 4.5, dx: 10, dy: -8 },
  { top: '35%', left: '5%', size: 4, color: 'rgba(255,82,82,0.4)', dur: 5.2, dx: -5, dy: 12 },
  { top: '65%', left: '9%', size: 5, color: 'rgba(255,122,0,0.3)', dur: 3.8, dx: 8, dy: 6 },
  { top: '12%', right: '10%', size: 5, color: 'rgba(255,82,82,0.45)', dur: 6.0, dx: -12, dy: -10 },
  { top: '45%', right: '7%', size: 4, color: 'rgba(255,122,0,0.35)', dur: 4.9, dx: 6, dy: 8 },
  { top: '75%', right: '8%', size: 6, color: 'rgba(255,82,82,0.3)', dur: 5.5, dx: -8, dy: -6 },
  { top: '85%', left: '22%', size: 4, color: 'rgba(255,122,0,0.25)', dur: 4.2, dx: 5, dy: 9 },
  { top: '22%', left: '52%', size: 3, color: 'rgba(255,82,82,0.2)', dur: 6.5, dx: -4, dy: -8 },
];

// Background colors mapping for the company logo containers
const logoBgs = {
  'McKinsey & Company': 'transparent',
  'JPMorgan Chase & Co. (Forage)': 'transparent',
  'Deloitte (Forage)': '#0d0d1a',
  'HackerRank': 'transparent',
};

export default function Certifications({ certifications }) {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  const certificationsCount = String(certifications.length).padStart(2, '0');

  return (
    <section
      id="certifications"
      className="w-full min-h-screen overflow-y-auto py-24 px-6 md:px-24 flex flex-col justify-start select-none relative"
      style={{
        background: 'linear-gradient(135deg, #fff8f5 0%, #fff3ee 50%, #fff8f5 100%)',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
      }}
    >
      {/* ════════════════ ANIMATED BACKGROUND ════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large coral blob — top left */}
        <motion.div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, #ff7a00 0%, #ff5252 60%, transparent 80%)',
            opacity: 0.85,
          }}
          animate={{
            y: [0, -15, 0, 10, 0],
            x: [0, 8, 0, -6, 0],
            scale: [1, 1.05, 1, 0.96, 1],
            opacity: [0.85, 0.95, 0.85, 0.75, 0.85],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Spinning dashed rings — top left */}
        <motion.div
          className="absolute top-6 left-6 w-20 h-20 rounded-full"
          style={{
            border: '2px dashed rgba(255,122,0,0.3)',
            background: 'transparent',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />

        {/* Large coral blob — bottom right */}
        <motion.div
          className="absolute -bottom-24 -right-16 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, #ff5252 0%, #ff7a00 55%, transparent 80%)',
            opacity: 0.8,
          }}
          animate={{
            y: [0, 12, 0, -10, 0],
            x: [0, -8, 0, 6, 0],
            scale: [1, 0.95, 1, 1.06, 1],
            opacity: [0.8, 0.7, 0.8, 0.9, 0.8],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Spinning solid ring — bottom right */}
        <motion.div
          className="absolute bottom-8 right-8 w-16 h-16 rounded-full"
          style={{
            border: '2px solid rgba(255,82,82,0.25)',
            background: 'transparent',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
        />

        {/* Scattered animated dots */}
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: dot.top,
              left: dot.left,
              right: dot.right,
              width: dot.size,
              height: dot.size,
              background: dot.color,
            }}
            animate={{
              y: [0, dot.dy, 0, -dot.dy * 0.7, 0],
              x: [0, dot.dx, 0, -dot.dx * 0.6, 0],
              opacity: [0.4, 0.9, 0.4, 0.8, 0.4],
              scale: [1, 1.3, 1, 0.9, 1],
            }}
            transition={{
              duration: dot.dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Very subtle grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,122,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ════════════════ CONTENT ════════════════ */}
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* ── Top Header and Counter Block ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          {/* Header Left */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase mb-3 px-3 py-1 rounded-full border"
              style={{
                color: '#ff5252',
                borderColor: 'rgba(255,82,82,0.18)',
                background: 'rgba(255,82,82,0.06)',
              }}
            >
               ACHIEVEMENTS
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-2">
              My{' '}
              <motion.span
                className="italic"
                style={{
                  background: 'linear-gradient(90deg, #ff7a00, #ff5252)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
                animate={{ skewX: [0, -1.5, 0, 1.5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                Certifications
              </motion.span>
            </h2>
            {/* Animated underline */}
            <motion.div
              className="h-[2px] mt-5 rounded-full"
              style={{ background: 'linear-gradient(90deg, #ff7a00, #ff5252)' }}
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <p className="text-gray-500 text-sm mt-4 max-w-md leading-relaxed">
              Certifications and programs that validate my skills, strengthen my knowledge, and drive my growth.
            </p>
          </motion.div>

          {/* Counter Right Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="flex items-center gap-4 px-6 py-4 bg-white/80 backdrop-filter backdrop-blur-md rounded-2xl border"
            style={{
              borderColor: 'rgba(255,122,0,0.1)',
              boxShadow: '0 8px 30px rgba(255,122,0,0.04)',
              minWidth: '220px',
            }}
          >
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-50 border border-orange-100"
              style={{ color: '#ff7a00' }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </motion.div>
            <div>
              <span className="text-3xl font-extrabold text-gray-900 leading-none">
                {certificationsCount}
              </span>
              <p className="text-xs font-semibold text-gray-400 mt-0.5 uppercase tracking-wider">
                Certifications Earned
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Certifications Grid ── */}
        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -8,
                scale: 1.015,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              className="group relative flex flex-col p-6 justify-between overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.92)',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255,122,0,0.1)',
                boxShadow: '0 8px 32px rgba(255,122,0,0.04), 0 2px 8px rgba(0,0,0,0.02)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Shimmer sweep on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-[1.5rem]"
                style={{ zIndex: 1 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                    backgroundPosition: '-100% 0',
                  }}
                  whileHover={{
                    backgroundPosition: ['-100% 0', '200% 0'],
                    transition: { duration: 0.6, ease: 'easeInOut' },
                  }}
                />
              </motion.div>

              {/* Star / Year Badge */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 shadow-sm">
                <span className="text-[10px] text-orange-500">★</span>
                <span className="text-[10px] font-bold text-orange-600 tracking-wider">
                  {cert.year || '2024'}
                </span>
              </div>

              {/* Main Content Layout */}
              <div className="flex gap-5 items-start relative z-10">
                {/* Company Logo box */}
                <div
                  className="w-24 h-16 rounded-xl flex items-center justify-center border overflow-hidden flex-shrink-0"
                  style={{
                    background: logoBgs[cert.organization] || '#0d0d1a',
                    borderColor: 'rgba(255,122,0,0.15)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    padding: cert.organization === 'Deloitte (Forage)' ? '8px' : '0',
                  }}
                >
                  {companyLogos[cert.organization] ? (
                    <img
                      src={companyLogos[cert.organization]}
                      alt={cert.organization}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : cert.organization === 'Deloitte (Forage)' ? (
                    deloitteSvg
                  ) : (
                    <span className="text-white text-xs font-bold whitespace-pre-line text-center">
                      {cert.logo || cert.organization}
                    </span>
                  )}
                </div>

                {/* Text Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors duration-300">
                    {cert.name}
                  </h3>
                  <p
                    className="text-xs font-semibold mt-1"
                    style={{
                      background: 'linear-gradient(90deg, #ff7a00, #ff5252)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {cert.organization}
                  </p>
                  <p className="text-gray-600 text-xs mt-3 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px my-5" style={{ background: 'rgba(0,0,0,0.06)' }} />

              {/* Footer Actions */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex gap-3">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 hover:scale-[1.02] transition-all duration-300"
                    style={{
                      background: 'linear-gradient(90deg, #ff7a00, #ff5252)',
                    }}
                  >
                    View Certificate
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

                <div className="flex items-center gap-1 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-[11px] font-semibold">{cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
