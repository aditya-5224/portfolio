import React from 'react';
import { motion } from 'motion/react';

export default function Projects({ projects }) {
  return (
    <section id="projects" className="py-24 px-8 md:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red mb-4">Portfolio</h2>
          <h3 className="text-4xl font-serif italic text-gray-900">Selected Projects</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="bg-gray-50 p-8 rounded-tr-[40px] rounded-bl-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="text-[10px] font-bold tracking-widest text-brand-red uppercase mb-4">
                {project.technologies.split(',')[0]}
              </div>
              <h4 className="text-xl font-serif text-gray-900 mb-4 h-14 overflow-hidden">
                {project.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="text-[10px] text-gray-400 font-medium">
                {project.technologies}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
