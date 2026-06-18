import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

/* ─────────────────────────────────────────────────────────────────
   TYPEWRITER HOOK — types code lines character-by-character
   ───────────────────────────────────────────────────────────────── */
function useTypewriter(lines, charDelay = 45, lineDelay = 600) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const copy = [...prev];
          copy[currentLine] = (copy[currentLine] || '') + line[currentChar];
          return copy;
        });
        setCurrentChar((c) => c + 1);
      }, charDelay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setDisplayedLines((prev) => [...prev, '']);
      }, lineDelay);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, lines, charDelay, lineDelay]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return { displayedLines, showCursor, isDone: currentLine >= lines.length };
}

/* ─────────────────────────────────────────────────────────────────
   SYNTAX HIGHLIGHTER — warm palette matching white-orange theme
   ───────────────────────────────────────────────────────────────── */
function highlightSyntax(text) {
  if (!text) return null;

  const parts = [];
  const regex = /(\/\/[^\n]*|'[^']*'|"[^"]*"|`[^`]*`|\b(?:import|from|const|new|export|default|function|return|class|extends)\b|\b(?:true|false|null|undefined)\b|\{|\}|\(|\)|,|;|=|=>|\.\.\.|\.)/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={`t-${lastIndex}`} style={{ color: '#374151' }}>
          {text.slice(lastIndex, match.index)}
        </span>
      );
    }

    const token = match[0];
    let color = '#374151';

    if (token.startsWith('//')) {
      color = '#9ca3af';
    } else if (token.startsWith("'") || token.startsWith('"') || token.startsWith('`')) {
      color = '#16a34a'; // green strings
    } else if (/^(import|from|const|new|export|default|function|return|class|extends)$/.test(token)) {
      color = '#dc2626'; // red-orange keywords matching brand
    } else if (/^(true|false|null|undefined)$/.test(token)) {
      color = '#ea580c'; // orange literals
    } else if (/^[{}(),.;=]$/.test(token) || token === '=>' || token === '...') {
      color = '#9ca3af';
    }

    parts.push(
      <span key={`m-${match.index}`} style={{ color, fontWeight: /^(import|from|const|new)$/.test(token) ? 700 : 400 }}>
        {token}
      </span>
    );

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(
      <span key={`e-${lastIndex}`} style={{ color: '#374151' }}>
        {text.slice(lastIndex)}
      </span>
    );
  }

  return parts;
}

/* ─────────────────────────────────────────────────────────────────
   HERO COMPONENT
   ───────────────────────────────────────────────────────────────── */
export default function Hero({ personalInfo }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // ── 3D tilt for code card ──
  const [cardRotateX, setCardRotateX] = useState(0);
  const [cardRotateY, setCardRotateY] = useState(0);
  const [cardHovered, setCardHovered] = useState(false);
  const cardRef = useRef(null);

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    const max = 10;
    setCardRotateX(-(my / (rect.height / 2)) * max);
    setCardRotateY((mx / (rect.width / 2)) * max);
  };

  const handleCardMouseLeave = () => {
    setCardRotateX(0);
    setCardRotateY(0);
    setCardHovered(false);
  };

  const handleDownloadResume = useCallback(() => {
    if (!personalInfo.resume) {
      alert('Resume not available');
      return;
    }

    try {
      const binaryString = atob(personalInfo.resume);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${personalInfo.name}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume');
    }
  }, [personalInfo]);

  // ── Code lines for the typewriter ──
  const codeLines = [
    `import { Developer } from`,
    `  '${personalInfo.name?.split(' ')[0]?.toLowerCase() || 'aditya'}.dev';`,
    ``,
    `const dev = new Developer({`,
    `  name: '${personalInfo.name || 'Aditya'}',`,
    `  skills: ['React', 'Node',`,
    `    'Java', 'Python'],`,
    `  passion: 'Scalable apps',`,
    `  available: true`,
    `});`,
  ];

  const { displayedLines, showCursor, isDone } = useTypewriter(codeLines, 35, 300);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    
    const maxRotate = 12;
    setRotateX(-(mouseY / (rect.height / 2)) * maxRotate);
    setRotateY((mouseX / (rect.width / 2)) * maxRotate);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex flex-col md:flex-row overflow-hidden select-none"
    >
      {/* Spotlight effect */}
      <div 
        className="absolute pointer-events-none w-[600px] h-[600px] rounded-full blur-[120px] z-20 transition-all duration-300 ease-out hidden md:block"
        style={{
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          background: 'radial-gradient(circle, rgba(255,82,82,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Left Side - Light Theme */}
      <div className="flex-1 flex flex-col justify-center px-17 md:px-24 py-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)' }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,82,82,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,82,82,0.05) 1px, transparent 1px)',
          backgroundSize: '70px 70px'
        }} />

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 relative"
        >
          <h1 className="text-3xl text-gray-400 mb-2 translate-x-20 font-medium">{personalInfo.name}</h1>
          <h1 className="text-5xl md:text-6xl font-serif italic translate-x-20 text-gray-900 mb-8 leading-tight">
            Software<br />Developer
          </h1>

          <a
            href="#projects"
            className="text-brand-red text-sm font-bold tracking-widest uppercase border-b border-brand-red pb-1 hover:text-red-600 hover:border-red-600 transition-colors translate-x-20 inline-block"
          >
            Explore
          </a>
        </motion.div>

        {/* Abstract Shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-red rounded-full opacity-[0.04]"
          />
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-1/4 left-1/4 w-40 h-20 bg-brand-red rounded-t-full opacity-10"
          />

          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                left: `${15 + i * 16}%`,
                top: `${25 + (i % 3) * 20}%`,
                background: '#ff5252',
                boxShadow: '0 0 6px rgba(255, 82, 82, 0.4)'
              }}
              animate={{ y: [0, -12, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>
      </div>

      {/* ── Center Profile Circle ── */}
      <div className="
        hidden md:flex
        absolute left-[44%] top-[40%]
        -translate-x-1/2 -translate-y-1/2
        z-30
        items-end justify-center
        w-[280px] lg:w-[340px]
        h-[280px] lg:h-[340px]
      ">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-full shadow-2xl rounded-full"
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`,
            transition: 'transform 0.15s ease-out',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red to-orange-500 rounded-full" />
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <img
              src={
                personalInfo.profilePic
                  ? `data:image/png;base64,${personalInfo.profilePic}`
                  : "https://picsum.photos/seed/dev/800/1000"
              }
              alt={personalInfo.name}
              className="w-full h-full object-cover object-top grayscale contrast-125 transition-transform duration-500 hover:scale-105"
              onError={(e) => { e.target.src = "https://picsum.photos/seed/dev/800/1000"; }}
            />
          </div>
          <div className="absolute inset-0 rounded-full ring-4 ring-brand-red/30 ring-offset-2" style={{ ringOffsetColor: 'transparent' }} />
          <div className="absolute -inset-4 rounded-full animate-glow-pulse pointer-events-none" />
        </motion.div>
      </div>

      {/* Mobile profile */}
      <div className="flex md:hidden justify-center items-center py-8"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-[220px] h-[220px]"
        >
          <div className="absolute inset-0 bg-brand-red rounded-full" />
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <img
              src={
                personalInfo.profilePic
                  ? `data:image/png;base64,${personalInfo.profilePic}`
                  : "https://picsum.photos/seed/dev/800/1000"
              }
              alt={personalInfo.name}
              className="w-full h-full object-cover object-top grayscale contrast-125"
              onError={(e) => { e.target.src = "https://picsum.photos/seed/dev/800/1000"; }}
            />
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════
          RIGHT SIDE — CODE EDITOR CARD (white-orange theme)
         ════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 py-16 md:py-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ff7a00 0%, #ff5252 50%, #e63946 100%)' }}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
              backgroundSize: '24px 24px',
            }}
          />
          <motion.div
            animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full border-[30px] border-white/10"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-12 -left-12 w-36 h-36 rounded-full border-[20px] border-white/8"
          />
        </div>

        {/* ── 3D Code Editor Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full max-w-[420px] z-10"
        >
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={handleCardMouseLeave}
            className="rounded-2xl overflow-hidden cursor-pointer group"
            style={{
              height: '460px',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: cardHovered
                ? '0 35px 80px rgba(0,0,0,0.18), 0 0 50px rgba(255,82,82,0.15), 0 0 0 1px rgba(255,255,255,0.4) inset'
                : '0 25px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.4) inset',
              transform: `perspective(1000px) rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg) translateZ(${cardHovered ? '20px' : '0px'})`,
              transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* ── Window Chrome (title bar) ── */}
            <div className="flex items-center justify-between px-5 py-3.5"
              style={{ background: 'rgba(249, 250, 251, 0.9)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
            >
              {/* Traffic light dots */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57', boxShadow: '0 0 4px rgba(255,95,87,0.4)' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e', boxShadow: '0 0 4px rgba(254,188,46,0.4)' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840', boxShadow: '0 0 4px rgba(40,200,64,0.4)' }} />
              </div>

              {/* Filename */}
              <span className="text-sm font-bold text-gray-500 tracking-wide">portfolio.js</span>

              {/* Status dot */}
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#28c840', boxShadow: '0 0 8px rgba(40,200,64,0.5)' }} />
            </div>

            {/* ── Code Area (FIXED HEIGHT) ── */}
            <div className="px-5 py-5 font-mono text-[13px] leading-[1.8] relative overflow-hidden" style={{ height: '340px' }}>
              {/* Line numbers gutter */}
              <div className="absolute left-0 top-0 pt-5 pl-2 flex flex-col text-right select-none"
                style={{ color: 'rgba(255,82,82,0.2)', fontSize: '11px', lineHeight: '1.8', fontFamily: 'monospace' }}
              >
                {codeLines.map((_, i) => (
                  <span key={i} className="pr-3">{i + 1}</span>
                ))}
              </div>

              {/* Code content */}
              <div className="pl-7">
                {codeLines.map((fullLine, idx) => (
                  <div key={idx} className="whitespace-pre" style={{ height: '1.8em' }}>
                    {idx < displayedLines.length ? (
                      <>
                        {highlightSyntax(displayedLines[idx])}
                        {/* Blinking cursor on the current typing line */}
                        {idx === displayedLines.length - 1 && !isDone && (
                          <span
                            className="inline-block w-[8px] h-[17px] align-middle ml-0.5 rounded-[2px]"
                            style={{
                              background: showCursor ? '#ff5252' : 'transparent',
                              transition: 'background 0.1s',
                              verticalAlign: 'text-bottom',
                            }}
                          />
                        )}
                      </>
                    ) : null}
                  </div>
                ))}
                {/* Cursor after typing is done — stays blinking on a new line */}
                {isDone && (
                  <div className="whitespace-pre" style={{ height: '1.8em' }}>
                    <span
                      className="inline-block w-[8px] h-[17px] align-middle rounded-[2px]"
                      style={{
                        background: showCursor ? '#ff5252' : 'transparent',
                        transition: 'background 0.1s',
                        verticalAlign: 'text-bottom',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Subtle orange glow in bottom-right corner */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,82,82,0.08), transparent 70%)' }}
              />
            </div>

            {/* ── Bottom Resume Button ── */}
            <div className="flex justify-center px-5 pb-5">
              <motion.button
                onClick={handleDownloadResume}
                whileHover={{ 
                  scale: 1.06, 
                  y: -3,
                  boxShadow: '0 15px 40px rgba(255,82,82,0.35), 0 0 20px rgba(255,122,0,0.2)',
                }}
                whileTap={{ scale: 0.94 }}
                animate={{
                  boxShadow: [
                    '0 8px 25px rgba(255,82,82,0.2), 0 0 0 0px rgba(255,82,82,0)',
                    '0 8px 25px rgba(255,82,82,0.25), 0 0 0 6px rgba(255,82,82,0.08)',
                    '0 8px 25px rgba(255,82,82,0.2), 0 0 0 0px rgba(255,82,82,0)',
                  ],
                }}
                transition={{ 
                  boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="relative flex items-center gap-3 px-8 py-3.5 rounded-xl text-[11px] font-extrabold tracking-widest uppercase cursor-pointer overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #ff5252 0%, #ff7a00 100%)',
                  color: '#fff',
                  border: 'none',
                }}
              >
                {/* Shimmer sweep */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
                    backgroundSize: '250% 100%',
                    animation: 'shimmer-btn 3s ease-in-out infinite',
                  }}
                />
                {/* Download icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="relative z-10">Download Resume</span>
              </motion.button>
            </div>
          </div>

          {/* Floating code bracket icon — bottom right */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-5 -right-5 w-14 h-14 rounded-xl flex items-center justify-center shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #ff5252, #ff7a00)',
              boxShadow: '0 10px 30px rgba(255,82,82,0.4)',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </motion.div>

          {/* Solutions badge — top left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -top-4 -left-4 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg"
            style={{
              background: 'rgba(255,255,255,0.95)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
            }}
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ff5252, #ff7a00)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xs font-extrabold text-gray-800 tracking-wide">Solutions</span>
          </motion.div>

          {/* 3D reflection glow under card */}
          <div className="absolute -bottom-6 left-[10%] right-[10%] h-12 rounded-full blur-2xl pointer-events-none"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          />
        </motion.div>
      </div>

    </div>
  );
}