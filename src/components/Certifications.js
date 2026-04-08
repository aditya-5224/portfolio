import React from 'react';
import { motion } from 'motion/react';

export default function Certifications({ certifications }) {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="w-full h-full overflow-hidden py-24 px-8 md:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-4">Achievements</h2>
          <h3 className="text-4xl font-serif italic text-gray-900">Certifications</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 border border-gray-200 rounded-lg hover:border-brand-red hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-lg">★</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-brand-red font-semibold mb-1">
                    {cert.organization}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {cert.date}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
