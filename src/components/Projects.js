import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

const ProjectCard = ({ project, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    
    const maxRotate = 12;
    setRotateX(-(mouseY / (rect.height / 2)) * maxRotate);
    setRotateY((mouseX / (rect.width / 2)) * maxRotate);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const techTags = project.technologies ? project.technologies.split(',').map(t => t.trim()) : [];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
      {/* Glow border effect on hover */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg, #ff5252, #ff525280, transparent, #ff525240, #ff5252)', borderRadius: '16px' }}
      />
      
      <div
        className="relative p-7 rounded-2xl overflow-hidden h-full"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(90deg, transparent, #ff5252, transparent)' }}
        />
        
        <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
          {/* Project number */}
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-[11px] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full"
              style={{ color: '#ff5252', background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.2)' }}
            >
              {techTags[0] || 'Project'}
            </span>
            <span className="text-white/20 text-xs font-mono">0{index + 1}</span>
          </div>
          
          <h4 className="text-xl font-serif text-white mb-3 group-hover:text-brand-red transition-colors duration-300">
            {project.title}
          </h4>
          
          <p className="text-sm text-white/50 leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>
          
          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {techTags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-medium px-2.5 py-1 rounded-full text-white/50 group-hover:text-white/70 transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: 'rgba(255,82,82,0.4)' }} />
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects({ projects }) {
  return (
    <section id="projects" className="w-full h-full overflow-y-auto py-24 px-8 md:px-24 flex flex-col justify-center select-none relative"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0808 30%, #0a050a 60%, #0f0a0a 100%)' }}
    >
      {/* Floating 3D orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] right-[10%] w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,82,82,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-[20%] left-[8%] w-60 h-60 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,82,82,0.08) 0%, transparent 70%)', filter: 'blur(35px)' }}
        />
        
        {/* Grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,82,82,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,82,82,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 18}%`,
              background: '#ff5252',
              boxShadow: '0 0 4px #ff5252'
            }}
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="inline-block text-[11px] font-bold tracking-[0.4em] uppercase text-brand-red mb-4 px-4 py-1.5 rounded-full border border-brand-red/30" style={{ background: 'rgba(255,82,82,0.1)' }}>
            Portfolio
          </span>
          <h3 className="text-4xl md:text-5xl font-serif italic text-white mt-2">
            Selected <span style={{ color: '#ff5252' }}>Projects</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
