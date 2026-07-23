import React from 'react';
import { motion } from 'motion/react';

const projectsList = [
  {
    id: 1,
    title: 'Career Compass',
    image: '/career_compass.png',
    link: 'https://carrer-compass-ruddy.vercel.app',
    github: 'https://github.com/aditya-5224',
  },
  {
    id: 2,
    title: 'Helping Bug',
    image: '/helping_bug.jpg',
    link: 'https://github.com/aditya-5224/Helping-Bug',
    github: 'https://github.com/aditya-5224/Helping-Bug',
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full min-h-screen overflow-y-auto py-24 px-6 md:px-24 flex flex-col justify-start select-none relative"
      style={{
        background: 'linear-gradient(135deg, #fffbf9 0%, #fff5f0 50%, #fffaf7 100%)',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Background Soft Glows & Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft coral glows in corners */}
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,82,82,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,82,82,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,82,82,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-brand-red mb-3 px-3 py-1 rounded-full border border-brand-red/10 bg-brand-red/5"
            style={{ color: '#ff5252' }}
          >
            MY WORK
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-2">
            Selected <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#ff7a00] to-[#ff5252]">Projects</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#ff7a00] to-[#ff5252] mx-auto mt-6 rounded-full" />
        </div>

        {/* Projects Grid Stack */}
        <div className="grid md:grid-cols-2 gap-10">
          {projectsList.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-[2rem] border border-gray-100 p-5 flex flex-col gap-5 justify-between relative overflow-hidden group"
              style={{
                boxShadow: '0 10px 40px rgba(255, 122, 0, 0.03), 0 2px 10px rgba(0, 0, 0, 0.01)',
              }}
            >
              {/* Image with Frame - click redirects to live app */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-gray-50 rounded-2xl p-3 border border-gray-100 overflow-hidden relative min-h-[220px] md:min-h-[260px]"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto max-h-[240px] object-contain rounded-xl shadow-sm transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </a>

              {/* Action Buttons right below the image */}
              <div className="flex gap-3 justify-center w-full">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff5252] text-white font-bold text-xs shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 hover:scale-[1.02] transition-all duration-300"
                >
                  🚀 Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-bold text-xs shadow-sm hover:bg-gray-50 hover:scale-[1.02] transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
