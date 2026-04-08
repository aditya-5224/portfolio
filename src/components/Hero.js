import React from 'react';
import { motion } from 'motion/react';

export default function Hero({ personalInfo }) {
  const handleDownloadResume = () => {
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
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">

      {/* Left Side - White */}
      <div className="flex-1 bg-white flex flex-col justify-center px-17 md:px-24 py-32 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 relative"
        >
          <h1 className="text-3xl text-gray-400 mb-2  translate-x-20 font-medium">{personalInfo.name}</h1>
          <h1 className="text-5xl md:text-6xl font-serif italic  translate-x-20 text-gray-900 mb-8 leading-tight">
            Software<br />Developer
          </h1>

          <a
            href="#experience"
            className="text-brand-red text-sm font-bold tracking-widest uppercase border-b border-brand-red pb-1 hover:text-red-600 hover:border-red-600 transition-colors"
          >
            Explore
          </a>
        </motion.div>

        {/* Abstract Shapes - kept within left panel */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-red rounded-full opacity-10"
          />
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-1/4 left-1/4 w-40 h-20 bg-brand-red rounded-t-full"
          />
        </div>
      </div>

      {/* ── Center Profile Circle ── sits above both panels */}
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
          className="relative w-full h-full"
        >
          {/* Red circle background */}
          <div className="absolute inset-0 bg-brand-red rounded-full" />

          {/* Profile photo clipped to circle */}
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

          {/* Subtle shadow ring */}
          <div className="absolute inset-0 rounded-full ring-4 ring-brand-red/30 ring-offset-2" />
        </motion.div>
      </div>

      {/* Mobile profile (stacked layout) */}
      <div className="flex md:hidden justify-center items-center py-8 bg-white">
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

      {/* Right Side - Red */}
      <div className="flex-1 bg-brand-red flex flex-col justify-center px-12 md:px-24 py-32 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md md:ml-16 lg:ml-24"  /* push text right to clear the circle */
        >
          <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight mb-8">
            Building scalable solutions for the problems of this century
          </h2>

          <p className="text-white/80 text-sm mb-12 leading-relaxed">
            {personalInfo.summary}
          </p>

          <motion.button
            onClick={handleDownloadResume}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-brand-red px-10 py-5 rounded-tr-3xl rounded-bl-3xl text-[11px] font-bold tracking-widest uppercase shadow-xl hover:shadow-2xl transition-shadow"
          >
            Download Resume
          </motion.button>
        </motion.div>
      </div>

    </div>
  );
}