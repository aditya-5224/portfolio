import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   3D TILT CARD WRAPPER
   ───────────────────────────────────────────────────────────────── */
function TiltCard({ children, className, style }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    const maxRotate = 6;
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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative ${className || ''}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? '8px' : '0px'})`,
        transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {/* Hover glow border matching brand gradient */}
      <div
        className="absolute -inset-[1px] rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255,122,0,0.4), rgba(255,82,82,0.4), rgba(230,57,70,0.2))', 
          borderRadius: '24px',
          filter: 'blur(0.5px)'
        }}
      />
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   INTERACTIVE 3D KITTY COMPONENT
   ───────────────────────────────────────────────────────────────── */
function InteractiveKitty() {
  const containerRef = useRef(null);
  const [isWinking, setIsWinking] = useState(false);
  const [isTwitched, setIsTwitched] = useState(false);
  const [isEnvelopeHovered, setIsEnvelopeHovered] = useState(false);
  
  // Motion values for tracking cursor relative to the center of the kitty
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for head rotation
  const rotateX = useSpring(useTransform(mouseY, [-350, 350], [12, -12]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-350, 350], [-12, 12]), { stiffness: 120, damping: 20 });

  // Pupils offset (move slightly towards cursor)
  const pupilX = useSpring(useTransform(mouseX, [-350, 350], [-5, 5]), { stiffness: 180, damping: 22 });
  const pupilY = useSpring(useTransform(mouseY, [-350, 350], [-4, 4]), { stiffness: 180, damping: 22 });

  // Whiskers rotation/movement on mouse move
  const whiskerRotateLeft = useSpring(useTransform(mouseX, [-350, 350], [-6, 6]), { stiffness: 90, damping: 15 });
  const whiskerRotateRight = useSpring(useTransform(mouseX, [-350, 350], [-6, 6]), { stiffness: 90, damping: 15 });

  // Periodic animations: Wink and Ear twitch
  useEffect(() => {
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.4) {
        setIsWinking(true);
        setTimeout(() => setIsWinking(false), 300);
      } else if (rand < 0.7) {
        setIsTwitched(true);
        setTimeout(() => setIsTwitched(false), 400);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate delta distance
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Limit range to prevent extreme rotation
      const limit = 500;
      const posX = Math.max(Math.min(deltaX, limit), -limit);
      const posY = Math.max(Math.min(deltaY, limit), -limit);

      mouseX.set(posX);
      mouseY.set(posY);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef} 
      className="relative flex flex-col items-center justify-center w-full max-w-[400px] h-[400px] select-none"
      style={{ perspective: 1200 }}
    >
      {/* 3D Container */}
      <motion.div 
        className="relative flex flex-col items-center justify-center"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Kitty shadow that scales relative to breathing */}
        <motion.div 
          className="absolute -bottom-6 w-48 h-5 bg-black/10 rounded-full blur-md"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.35, 0.5]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Vector Kitty Illustration */}
        <motion.svg 
          width="260" 
          height="280" 
          viewBox="0 0 260 280" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{
            y: [0, -8, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Kitty tail - smooth organic wag */}
          <motion.path 
            d="M 195 218 C 215 218, 240 210, 245 185 C 248 165, 230 155, 225 165 C 220 175, 232 188, 230 198 C 228 212, 202 216, 195 218" 
            stroke="#2d3139" 
            strokeWidth="10" 
            strokeLinecap="round"
            fill="none"
            animate={{
              rotate: [0, 10, -8, 0],
              y: [0, 3, -2, 0]
            }}
            transition={{
              duration: 3.0,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ originX: '195px', originY: '218px' }}
          />

          {/* Kitty Body */}
          <path 
            d="M 60 220 C 60 160, 200 160, 200 220 C 200 260, 60 260, 60 220 Z" 
            fill="#3f4451" 
          />
          <path 
            d="M 75 220 C 75 180, 185 180, 185 220 C 185 250, 75 250, 75 220 Z" 
            fill="#2d3139" 
          />

          {/* Head & Ears */}
          <g style={{ transformStyle: 'preserve-3d' }}>
            {/* Left Ear - Twitchable */}
            <motion.path 
              d="M 50 110 L 42 30 L 95 65 Z" 
              fill="#2d3139"
              animate={isTwitched ? { rotate: [0, -10, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              style={{ originX: '70px', originY: '85px' }}
            />
            <motion.path 
              d="M 55 100 L 50 45 L 85 70 Z" 
              fill="#1e2129"
              animate={isTwitched ? { rotate: [0, -10, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              style={{ originX: '70px', originY: '85px' }}
            />
            
            {/* Right Ear */}
            <path d="M 210 110 L 218 30 L 165 65 Z" fill="#2d3139" />
            <path d="M 205 100 L 210 45 L 175 70 Z" fill="#1e2129" />

            {/* Face/Head Base */}
            <ellipse cx="130" cy="115" rx="85" ry="70" fill="#3f4451" />
            <ellipse cx="130" cy="115" rx="78" ry="63" fill="#2d3139" />

            {/* Mask/Eyes Frame */}
            <path 
              d="M 68 115 C 68 85, 120 85, 130 100 C 140 85, 192 85, 192 115 C 192 145, 140 145, 130 135 C 120 145, 68 145, 68 115 Z" 
              fill="#1e2129" 
            />

            {/* Left Eye (Can Wink) */}
            <AnimatePresence initial={false}>
              {isWinking ? (
                <motion.path 
                  d="M 82 115 Q 102 125 122 115" 
                  stroke="#ffffff" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  fill="none" 
                  key="wink-left"
                />
              ) : (
                <motion.ellipse 
                  cx="102" 
                  cy="115" 
                  rx="20" 
                  ry="18" 
                  fill="#ffffff" 
                  key="eye-left"
                />
              )}
            </AnimatePresence>

            {/* Right Eye */}
            <ellipse cx="158" cy="115" rx="20" ry="18" fill="#ffffff" />

            {/* Interactive Pupils */}
            {!isWinking && (
              <>
                {/* Left Pupil */}
                <motion.ellipse 
                  cx="102" 
                  cy="115" 
                  rx="11" 
                  ry="12" 
                  fill="#1e2129"
                  style={{ x: pupilX, y: pupilY }}
                />
                <motion.circle 
                  cx="106" 
                  cy="111" 
                  r="4" 
                  fill="#ffffff"
                  style={{ x: pupilX, y: pupilY }}
                />
              </>
            )}

            {/* Right Pupil */}
            <motion.ellipse 
              cx="158" 
              cy="115" 
              rx="11" 
              ry="12" 
              fill="#1e2129"
              style={{ x: pupilX, y: pupilY }}
            />
            <motion.circle 
              cx="162" 
              cy="111" 
              r="4" 
              fill="#ffffff"
              style={{ x: pupilX, y: pupilY }}
            />

            {/* Pink Nose & Cute Smile */}
            <path d="M 125 125 L 135 125 L 130 129 Z" fill="#ff758f" />
            <path 
              d="M 124 133 C 127 136, 130 136, 130 133 C 130 136, 133 136, 136 133" 
              stroke="#ff758f" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              fill="none" 
            />

            {/* Whiskers */}
            {/* Left Whiskers */}
            <motion.g style={{ originX: '70px', originY: '125px', rotate: whiskerRotateLeft }}>
              <line x1="72" y1="120" x2="35" y2="114" stroke="#4a505e" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="70" y1="126" x2="30" y2="126" stroke="#4a505e" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="72" y1="132" x2="35" y2="138" stroke="#4a505e" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>

            {/* Right Whiskers */}
            <motion.g style={{ originX: '190px', originY: '125px', rotate: whiskerRotateRight }}>
              <line x1="188" y1="120" x2="225" y2="114" stroke="#4a505e" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="190" y1="126" x2="230" y2="126" stroke="#4a505e" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="188" y1="132" x2="225" y2="138" stroke="#4a505e" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>
          </g>

          {/* Envelope (held by paws in front) */}
          <g style={{ transformStyle: 'preserve-3d' }}>
            {/* Interactive Envelope Wrapper */}
            <motion.g 
              onMouseEnter={() => setIsEnvelopeHovered(true)}
              onMouseLeave={() => setIsEnvelopeHovered(false)}
              whileHover="hover"
              initial="rest"
              className="cursor-pointer"
            >
              {/* Back of Envelope */}
              <rect x="85" y="175" width="90" height="60" rx="3" fill="#eaecef" />

              {/* Layering changes conditionally based on whether it is hovered */}
              {isEnvelopeHovered ? (
                <>
                  {/* Flap open behind the letter */}
                  <motion.path 
                    variants={{
                      rest: { d: "M 85 175 L 130 210 L 175 175 Z" },
                      hover: { d: "M 85 175 L 130 148 L 175 175 Z" }
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    fill="#a8dadc" 
                  />
                  {/* Letter Inside */}
                  <motion.g
                    variants={{
                      rest: { y: 0 },
                      hover: { y: -35 }
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 12 }}
                  >
                    {/* The Letter Card */}
                    <rect x="90" y="160" width="80" height="50" rx="4" fill="#ffffff" stroke="#ff5252" strokeWidth="1" />
                    <text x="130" y="188" fill="#ff5252" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="cursive">Hello</text>
                  </motion.g>
                </>
              ) : (
                <>
                  {/* Letter Inside */}
                  <motion.g
                    variants={{
                      rest: { y: 0 },
                      hover: { y: -35 }
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 12 }}
                  >
                    {/* The Letter Card */}
                    <rect x="90" y="160" width="80" height="50" rx="4" fill="#ffffff" stroke="#ff5252" strokeWidth="1" />
                    <text x="130" y="188" fill="#ff5252" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="cursive">Hello</text>
                  </motion.g>
                  {/* Flap closed in front */}
                  <motion.path 
                    variants={{
                      rest: { d: "M 85 175 L 130 210 L 175 175 Z" },
                      hover: { d: "M 85 175 L 130 148 L 175 175 Z" }
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    fill="#a8dadc" 
                  />
                </>
              )}

              {/* Front Cover / Triangular Pocket */}
              <path d="M 85 235 L 130 200 L 175 235 Z" fill="#d2d6dc" />

              {/* Paws Holding the Envelope */}
              <circle cx="92" cy="205" r="9" fill="#2d3139" />
              <circle cx="168" cy="205" r="9" fill="#2d3139" />
            </motion.g>
          </g>
        </motion.svg>
      </motion.div>

      {/* Caption Text below Kitty */}
      <motion.p 
        className="mt-6 text-gray-800 font-serif italic text-2xl tracking-wide select-none"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Connect with me today!
      </motion.p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN CONNECT COMPONENT
   ───────────────────────────────────────────────────────────────── */
export default function Connect({ personalInfo }) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus('error');
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      setStatus('loading');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <section
      id="connect"
      className="w-full min-h-screen flex flex-col justify-between font-sans relative overflow-hidden select-none"
      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)' }}
    >
      {/* Background decorations - beautiful floating circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Glowing floating blobs */}
        <motion.div 
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full" 
          style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} 
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full" 
          style={{ background: 'radial-gradient(circle, rgba(255,82,82,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} 
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Theme matching Grid Layout */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,82,82,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,82,82,0.03) 1px, transparent 1px)',
          backgroundSize: '70px 70px'
        }} />
      </div>

      {/* Main Grid Container */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 z-10 py-16">
        
        {/* Left Side: Animated Kitty */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <InteractiveKitty />
        </div>

        {/* Right Side: Contact Form in a 3D TiltCard */}
        <div className="w-full md:w-1/2 max-w-[480px]">
          <TiltCard>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 md:p-10 rounded-[24px] shadow-2xl relative overflow-hidden"
              style={{
                background: '#121316',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.35)'
              }}
            >
              {/* Card corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,82,82,0.18), transparent 70%)' }}
              />

              <h2 className="text-3xl font-black text-white tracking-tight">
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7a00] to-[#ff5252]">talk</span>
              </h2>
              <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                To request a quote or want to meet up for coffee, contact me directly or fill out the form and I will get back to you soon.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="e.g. Aditya Yadav"
                    disabled={status === 'loading' || status === 'success'}
                    className="px-5 py-3.5 rounded-xl text-sm text-white placeholder-gray-600 transition-all duration-300 w-full focus:outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '1px solid rgba(255,82,82,0.6)';
                      e.target.style.boxShadow = '0 0 12px rgba(255,82,82,0.2)';
                      e.target.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(255,255,255,0.06)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="e.g. aditya@example.com"
                    disabled={status === 'loading' || status === 'success'}
                    className="px-5 py-3.5 rounded-xl text-sm text-white placeholder-gray-600 transition-all duration-300 w-full focus:outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '1px solid rgba(255,82,82,0.6)';
                      e.target.style.boxShadow = '0 0 12px rgba(255,82,82,0.2)';
                      e.target.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(255,255,255,0.06)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Type your message here..."
                    disabled={status === 'loading' || status === 'success'}
                    className="px-5 py-3.5 rounded-xl text-sm text-white placeholder-gray-600 transition-all duration-300 w-full focus:outline-none resize-none"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '1px solid rgba(255,82,82,0.6)';
                      e.target.style.boxShadow = '0 0 12px rgba(255,82,82,0.2)';
                      e.target.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(255,255,255,0.06)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  />
                </div>

                {/* Submit Button & Feedback status */}
                <div className="mt-3 flex flex-col gap-4">
                  <motion.button
                    whileHover={{ 
                      scale: status === 'loading' || status === 'success' ? 1 : 1.02,
                      boxShadow: '0 12px 30px rgba(255,82,82,0.45)'
                    }}
                    whileTap={{ scale: status === 'loading' || status === 'success' ? 1 : 0.98 }}
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest text-[#121316] flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #ff7a00 0%, #ff5252 50%, #e63946 100%)',
                      color: '#ffffff'
                    }}
                  >
                    {status === 'loading' ? (
                      <span className="w-4 h-4 border-2 border-[#121316]/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </motion.button>

                  {/* Status Banners */}
                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl text-xs font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <span>Message sent successfully! I'll get back to you soon.</span>
                      </motion.div>
                    )}

                    {status === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-rose-400 bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl text-xs font-medium"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>
          </TiltCard>
        </div>

      </div>

      {/* Footer embedded inside Connect Page */}
      {personalInfo && (
        <footer className="py-8 px-6 md:px-12 w-full flex flex-col justify-center items-center border-t border-brand-red/10 z-10"
          style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' }}
        >
          <div className="max-w-6xl w-full flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-brand-red rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-tr-full"></div>
              </div>
              <span className="font-serif italic text-lg text-gray-900">{personalInfo.name}</span>
            </div>
            
            <div className="flex gap-6 text-[10px] font-bold tracking-widest uppercase text-gray-500">
              <p>© 2026 {personalInfo.name}</p>
              <a href={`mailto:${personalInfo.email}`} className="hover:text-brand-red transition-colors duration-300">Email</a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors duration-300">LinkedIn</a>
            </div>
          </div>
        </footer>
      )}
    </section>
  );
}
