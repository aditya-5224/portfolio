import React from 'react';
import { motion } from 'motion/react';

export default function Skills({ skills }) {
  const categories = [
    { name: 'Programming', items: skills.programming || [] },
    { name: 'Distributed Systems', items: skills.distributed || [] },
    { name: 'Web', items: skills.web || [] },
    { name: 'Backend', items: skills.backend || [] },
    { name: 'Databases', items: skills.databases || [] },
    { name: 'Tools', items: skills.tools || [] },
    { name: 'CS Fundamentals', items: skills.cs_fundamentals || [] },
    { name: 'Other', items: skills.other || [] }
  ];

  return (
    <section id="skills" className="py-24 px-8 md:px-24 bg-brand-red text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60 mb-4">Expertise</h2>
          <h3 className="text-4xl font-serif italic text-white">Technical Skills</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((cat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-sm font-bold tracking-widest uppercase mb-6 pb-2 border-b border-white/20">
                {cat.name}
              </h4>
              <ul className="space-y-3">
                {cat.items.map((skill, i) => (
                  <li key={i} className="text-sm text-white/80 hover:text-white transition-colors cursor-default">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
