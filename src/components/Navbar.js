import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function Navbar() {
  const [showConnectMenu, setShowConnectMenu] = useState(false);

  const handleEmailClick = () => {
    window.location.href = 'mailto:annuy8055@gmail.com';
    setShowConnectMenu(false);
  };

  const handleWhatsAppClick = () => {
    window.location.href = 'https://wa.me/918932091318';
    setShowConnectMenu(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-white/80 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-tr-full"></div>
        </div>
      </div>

      <div className="hidden md:flex gap-8 text-[11px] font-bold tracking-widest uppercase text-gray-800">
        <a href="#services" className="hover:text-brand-red transition-colors">Services</a>
        <a href="#experience" className="hover:text-brand-red transition-colors">Experience</a>
        <a href="#projects" className="hover:text-brand-red transition-colors">Projects</a>
        <a href="#skills" className="hover:text-brand-red transition-colors">Skills</a>
      </div>

      <div className="relative">
        <button 
          onClick={() => setShowConnectMenu(!showConnectMenu)}
          className="border border-gray-300 rounded-full px-8 py-2 text-[11px] font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors"
        >
          Connect
        </button>

        {showConnectMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
          >
            <button
              onClick={handleEmailClick}
              className="w-full px-6 py-3 text-left text-[11px] font-bold tracking-widest uppercase text-gray-800 hover:bg-brand-red hover:text-white transition-colors flex items-center gap-2"
            >
              <span>✉️</span> Gmail
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="w-full px-6 py-3 text-left text-[11px] font-bold tracking-widest uppercase text-gray-800 hover:bg-brand-red hover:text-white transition-colors flex items-center gap-2 border-t border-gray-200"
            >
              <span>💬</span> WhatsApp
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
