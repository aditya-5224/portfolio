import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [showConnectMenu, setShowConnectMenu] = useState(false);
  const [visible, setVisible] = useState(true);
  const touchStartY = useRef(0);

  const handleEmailClick = () => {
    window.location.href = 'mailto:yadi.tya5224@gmail.com';
    setShowConnectMenu(false);
  };

  const handleWhatsAppClick = () => {
    window.location.href = 'https://wa.me/7068731914';
    setShowConnectMenu(false);
  };

  // ── Scroll / Swipe detection to hide/show navbar ──
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        setVisible(false);
        setShowConnectMenu(false);
      } else if (e.deltaY < 0) {
        setVisible(true);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (diff > 45) {
        setVisible(false);
        setShowConnectMenu(false);
      } else if (diff < -45) {
        setVisible(true);
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <motion.nav 
      animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-7 px-8 py-3.5 rounded-full border shadow-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.88)',
        borderColor: 'rgba(255, 82, 82, 0.12)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.08), 0 0 30px rgba(255,82,82,0.04)',
      }}
    >
      {/* Nav links — clean bold text only */}
      <div className="flex items-center gap-7 text-[11px] font-extrabold tracking-widest uppercase text-gray-500">
        <a href="#coding-stats" className="relative hover:text-brand-red transition-colors duration-300 py-1 group">
          Stats
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red rounded-full transition-all duration-300 group-hover:w-full" />
        </a>
        <a href="#education" className="relative hover:text-brand-red transition-colors duration-300 py-1 group">
          Education
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red rounded-full transition-all duration-300 group-hover:w-full" />
        </a>
        <a href="#projects" className="relative hover:text-brand-red transition-colors duration-300 py-1 group">
          Projects
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red rounded-full transition-all duration-300 group-hover:w-full" />
        </a>
        <a href="#skills" className="relative hover:text-brand-red transition-colors duration-300 py-1 group">
          Skills
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red rounded-full transition-all duration-300 group-hover:w-full" />
        </a>
      </div>

      <div className="h-4 w-[1px] bg-gray-200" />

      {/* Connect button */}
      <div className="relative">
        <motion.button 
          onClick={() => setShowConnectMenu(!showConnectMenu)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full px-5 py-1.5 text-[11px] font-extrabold tracking-widest uppercase text-brand-red hover:text-red-600 transition-all duration-300"
          style={{
            border: '1px solid rgba(255, 82, 82, 0.25)',
            background: 'rgba(255, 82, 82, 0.05)',
          }}
        >
          Connect
        </motion.button>

        {/* Connection menu opens upward */}
        <AnimatePresence>
          {showConnectMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-12 right-0 mb-2 w-44 rounded-xl overflow-hidden z-50"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(255, 82, 82, 0.15)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 -15px 40px rgba(0,0,0,0.1), 0 0 30px rgba(255,82,82,0.05)',
              }}
            >
              <button
                onClick={handleEmailClick}
                className="w-full px-6 py-3 text-left text-[11px] font-extrabold tracking-widest uppercase text-gray-700 hover:bg-brand-red/10 hover:text-brand-red transition-all duration-200"
              >
                Gmail
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="w-full px-6 py-3 text-left text-[11px] font-extrabold tracking-widest uppercase text-gray-700 hover:bg-brand-red/10 hover:text-brand-red transition-all duration-200"
                style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
              >
                WhatsApp
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
