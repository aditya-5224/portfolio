import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function Skills({ skills }) {
  const tabs = useMemo(
    () => [
      {
        id: 'foundations',
        label: 'Foundations',
        groups: [
          { name: 'Programming', items: skills.programming || [] },
          { name: 'CS Fundamentals', items: skills.cs_fundamentals || [] },
          { name: 'Other', items: skills.other || [] },
        ],
      },
      {
        id: 'systems',
        label: 'Systems',
        groups: [
          { name: 'Distributed Systems', items: skills.distributed || [] },
          { name: 'Backend', items: skills.backend || [] },
          { name: 'Databases', items: skills.databases || [] },
        ],
      },
      {
        id: 'product',
        label: 'Product',
        groups: [
          { name: 'Web', items: skills.web || [] },
          { name: 'Tools', items: skills.tools || [] },
        ],
      },
    ],
    [skills]
  );

  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? 'foundations');

  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section id="skills" className="w-full h-full overflow-hidden bg-brand-red text-white">
      <div className="w-full h-full flex flex-col md:flex-row overflow-hidden">
        <div
          className="md:w-[38%] flex flex-col justify-between px-10 md:px-16 py-16 relative overflow-hidden"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 0, transparent 48px)',
            backgroundSize: '20px 20px',
          }}
        >
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full border-[40px] border-white/10" />

          <div className="relative z-10">
            <p className="text-white/50 text-xs tracking-[4px] uppercase mb-3 font-medium">What I work with</p>
            <h2 className="text-5xl md:text-6xl font-serif italic text-white leading-tight">
              Technical
              <br />
              Skills
            </h2>
          </div>

          <div className="relative z-10 flex flex-col gap-3">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'text-left px-6 py-3 text-sm font-bold tracking-wider uppercase transition-all duration-300',
                    isActive
                      ? 'bg-white text-brand-red shadow-xl rounded-tr-2xl rounded-bl-2xl'
                      : 'text-white/60 hover:text-white',
                  ].join(' ')}
                >
                  {tab.label}
                </button>
              );
            })}

            <p className="text-white/30 text-xs tracking-widest mt-2">
              {active.groups.reduce((count, group) => count + group.items.length, 0)} skills
            </p>
          </div>
        </div>

        <div className="flex-1 bg-white text-gray-900 flex flex-col justify-center px-10 md:px-16 py-16 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-80 h-80 bg-brand-red/5 rounded-full blur-2xl" />

          <div className="relative z-10" style={{ perspective: '700px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 40, rotateY: -12 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -40, rotateY: 12 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-gray-300 text-xs tracking-[4px] uppercase mb-8 font-medium">{active.label}</p>

                <div className="grid gap-7 md:grid-cols-2">
                  {active.groups.map((group) => (
                    <motion.div
                      key={group.name}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45 }}
                      className="space-y-4"
                    >
                      <div className="flex items-end justify-between gap-4">
                        <h4 className="text-gray-800 font-medium text-sm tracking-[3px] uppercase">{group.name}</h4>
                        <span className="text-brand-red text-[11px] font-bold tracking-[3px] uppercase">
                          {group.items.length}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {group.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-2 rounded-full border border-gray-200 text-gray-700 text-xs font-medium tracking-wide bg-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
