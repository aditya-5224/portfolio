import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

const EducationCard = ({ edu, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    
    const maxRotate = 8;
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
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer relative"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? '15px' : '0px'})`,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="flex items-start gap-6">
        {/* Timeline dot and line */}
        <div className="flex flex-col items-center flex-shrink-0 pt-2">
          <motion.div
            animate={isHovered ? { scale: 1.3, boxShadow: '0 0 15px rgba(255,82,82,0.6)' } : { scale: 1, boxShadow: '0 0 0px transparent' }}
            className="w-4 h-4 rounded-full border-2 z-10"
            style={{ borderColor: '#ff5252', background: isHovered ? '#ff5252' : 'transparent' }}
          />
          <div className="w-[2px] flex-1 min-h-[40px] mt-1" style={{ background: 'rgba(255,82,82,0.15)' }} />
        </div>

        {/* Card content */}
        <div
          className="flex-1 p-6 rounded-2xl relative overflow-hidden mb-4 group-hover:border-brand-red/30 transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 0% 0%, rgba(255,82,82,0.08), transparent 60%)' }}
          />
          
          <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-serif text-white group-hover:text-brand-red transition-colors duration-300">{edu.degree}</h4>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ml-4"
                style={{ color: '#ff5252', background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.2)' }}
              >
                {edu.year}
              </span>
            </div>
            <p className="text-sm text-white/40">{edu.institution}</p>
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: 'rgba(255,82,82,0.3)' }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Education({ education }) {
  return (
    <section id="education" className="w-full h-full overflow-y-auto py-24 px-8 md:px-24 flex flex-col justify-center select-none relative"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0d0808 30%, #0a0a0a 60%, #0f0a0a 100%)' }}
    >
      {/* Floating 3D orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] left-[15%] w-56 h-56 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,82,82,0.1) 0%, transparent 70%)', filter: 'blur(35px)' }}
        />
        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[25%] right-[10%] w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,82,82,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        
        {/* Grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,82,82,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,82,82,0.03) 1px, transparent 1px)',
          backgroundSize: '70px 70px'
        }} />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${15 + i * 14}%`,
              top: `${25 + (i % 3) * 20}%`,
              background: '#ff5252',
              boxShadow: '0 0 4px #ff5252'
            }}
            animate={{ y: [0, -12, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="inline-block text-[11px] font-bold tracking-[0.4em] uppercase text-brand-red mb-4 px-4 py-1.5 rounded-full border border-brand-red/30" style={{ background: 'rgba(255,82,82,0.1)' }}>
            Academic Background
          </span>
          <h3 className="text-4xl md:text-5xl font-serif italic text-white mt-2">
            Education & <span style={{ color: '#ff5252' }}>Qualification</span>
          </h3>
        </motion.div>

        <div className="space-y-2">
          {education.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
