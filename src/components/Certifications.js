import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

const CertificationCard = ({ cert, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    
    const maxRotate = 10;
    setRotateX(-(mouseY / (rect.height / 2)) * maxRotate);
    setRotateY((mouseX / (rect.width / 2)) * maxRotate);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer relative"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? '20px' : '0px'})`,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow border on hover */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg, #ff5252, transparent 40%, transparent 60%, #ff525280)', borderRadius: '16px' }}
      />

      <div
        className="relative p-6 rounded-2xl overflow-hidden h-full"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(90deg, transparent, #ff5252, transparent)' }}
        />

        {/* Hover background glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,82,82,0.06), transparent 60%)' }}
        />

        <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }} className="flex items-start gap-4">
          {/* Star badge */}
          <motion.div
            animate={isHovered ? { rotate: 360, scale: 1.15 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
            style={{
              background: 'linear-gradient(135deg, #ff5252, #ff3b3b)',
              boxShadow: isHovered ? '0 0 20px rgba(255,82,82,0.5)' : '0 4px 12px rgba(255,82,82,0.2)',
            }}
          >
            <span className="text-white text-lg">★</span>
          </motion.div>

          <div className="flex-1 min-w-0">
            <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-brand-red transition-colors duration-300">
              {cert.name}
            </h4>
            <p className="text-sm font-semibold mb-1" style={{ color: '#ff5252' }}>
              {cert.organization}
            </p>
            <p className="text-xs text-white/30 mb-2.5">
              {cert.date}
            </p>
            <p className="text-sm text-white/45 leading-relaxed">
              {cert.description}
            </p>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-14 h-14 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: 'rgba(255,82,82,0.3)' }} />
        </div>
      </div>
    </motion.div>
  );
};

export default function Certifications({ certifications }) {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="w-full h-full overflow-y-auto py-24 px-8 md:px-24 flex flex-col justify-center select-none relative"
      style={{ background: 'linear-gradient(135deg, #0f0a0a 0%, #0a0808 30%, #0d0a0a 60%, #0a0a0f 100%)' }}
    >
      {/* Floating 3D orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 12, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[12%] right-[15%] w-60 h-60 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,82,82,0.12) 0%, transparent 70%)', filter: 'blur(35px)' }}
        />
        <motion.div
          animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[18%] left-[12%] w-56 h-56 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,82,82,0.08) 0%, transparent 70%)', filter: 'blur(30px)' }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,82,82,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,82,82,0.03) 1px, transparent 1px)',
          backgroundSize: '70px 70px'
        }} />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${12 + i * 11}%`,
              top: `${18 + (i % 4) * 18}%`,
              background: '#ff5252',
              boxShadow: '0 0 4px #ff5252'
            }}
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="inline-block text-[11px] font-bold tracking-[0.4em] uppercase text-brand-red mb-4 px-4 py-1.5 rounded-full border border-brand-red/30" style={{ background: 'rgba(255,82,82,0.1)' }}>
            Achievements
          </span>
          <h3 className="text-4xl md:text-5xl font-serif italic text-white mt-2">
            My <span style={{ color: '#ff5252' }}>Certifications</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
