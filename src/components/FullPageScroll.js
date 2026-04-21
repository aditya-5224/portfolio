import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function FullPageScroll({ children }) {
  const sections = React.Children.toArray(children);
  const [visible, setVisible] = useState({ 0: true });
  const sectionRefs = useRef([]);

  const sectionIds = useMemo(() => sections.map((_, i) => i), [sections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = { ...prev };
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const index = Number(entry.target.getAttribute('data-section-index'));
              next[index] = true;
            }
          }
          return next;
        });
      },
      {
        threshold: 0.35,
      }
    );

    for (const el of sectionRefs.current) {
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <div style={{ width: '100%' }}>
      {sections.map((section, i) => {
        const isVisible = Boolean(visible[i]);
        return (
        <section
          key={i}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          data-section-index={i}
          style={{
            minHeight: '100vh',
            width: '100%',
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? 'translateY(0) translateZ(0) rotateX(0deg)'
              : 'translateY(60px) translateZ(-300px) rotateX(8deg)',
            transformOrigin: 'center bottom',
            transition: 'transform 0.85s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.85s cubic-bezier(0.76, 0, 0.24, 1)',
            willChange: 'transform, opacity',
            perspective: '1200px',
          }}
        >
          {section}
        </section>
        );
      })}
    </div>
  );
}