import React from 'react';
import { motion } from 'motion/react';

export default function Experience({ experience }) {
  return (
    <section id="experience" className="py-24 px-8 md:px-24 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red mb-4">Professional Path</h2>
          <h3 className="text-4xl font-serif italic text-gray-900">Experience</h3>
        </motion.div>

        <div className="space-y-12">
          {experience.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grid md:grid-cols-[250px_1fr] gap-8 border-b border-gray-200 pb-12"
            >
              <div>
                <p className="text-sm font-bold text-gray-900">{exp.period}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{exp.company}</p>
              </div>
              <div>
                <h4 className="text-xl font-serif text-gray-900 mb-4">{exp.role}</h4>
                <ul className="space-y-3">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-3">
                      <span className="text-brand-red mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-red shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
