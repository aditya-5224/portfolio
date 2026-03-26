import React from 'react';
import { motion } from 'motion/react';

export default function Education({ education }) {
  return (
    <section id="education" className="py-24 px-8 md:px-24 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red mb-4">Academic Background</h2>
          <h3 className="text-4xl font-serif italic text-gray-900">Education</h3>
        </motion.div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-tr-3xl rounded-bl-3xl border border-gray-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-serif text-gray-900">{edu.degree}</h4>
                  <p className="text-sm text-gray-500">{edu.institution}</p>
                </div>
                <span className="text-sm font-bold text-brand-red">{edu.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
