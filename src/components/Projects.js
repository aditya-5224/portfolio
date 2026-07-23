import React from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/* ─────────────────────────── DATA ─────────────────────────── */
const projectsList = [
  {
    id: 1,
    title: 'Career Compass',
    subtitle: 'AI Career Engineering Platform',
    image: '/career_compass.png',
    link: 'https://carrer-compass-ruddy.vercel.app',
    github: 'https://github.com/aditya-5224',
    status: 'LIVE',
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Gemini API', 'Tailwind'],
    imgBg: '#111118',
    imgFit: 'object-cover',
  },
  {
    id: 2,
    title: 'Helping Bug',
    subtitle: 'AI Codebase Copilot',
    image: '/helping_bug.jpg',
    link: 'https://github.com/aditya-5224/Helping-Bug',
    github: 'https://github.com/aditya-5224/Helping-Bug',
    status: 'LIVE',
    techStack: ['Python', 'Gemini API', 'React', 'FastAPI'],
    imgBg: '#0b0c1a',
    imgFit: 'object-contain',
  },
];

/* ─────────────────────────── ICONS ─────────────────────────── */
const techIcons = {
  'Next.js': (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.053,0.19,0.137,0.236l2.409,1.391c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603v10.15c0,0.659-0.354,1.275-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z" />
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
    </svg>
  ),
  'Gemini API': (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09c.376 0 .707.088.95.232.617.356.879 1.417.832 2.8-.005.207-.019.43-.043.652-.977-.243-2.043-.454-3.164-.618a25.45 25.45 0 0 0-1.774-2.65C14.512 2.588 15.43 2.093 16.873 2.093zm-7.756 0c1.448 0 2.371.503 3.163 1.422a25.45 25.45 0 0 0-1.774 2.65c-1.122.164-2.186.375-3.164.618-.024-.222-.039-.445-.043-.652-.047-1.383.215-2.444.832-2.8.243-.144.574-.232.95-.232zM12 9.39c.562 0 1.104.046 1.63.112.38.572.733 1.216 1.044 1.895.33.63.624 1.28.888 1.944-.265.664-.559 1.314-.888 1.944a24.474 24.474 0 0 1-1.044 1.895 24.42 24.42 0 0 1-3.26 0 24.474 24.474 0 0 1-1.044-1.895A24.474 24.474 0 0 1 8.44 13.45a24.474 24.474 0 0 1 .888-1.944A24.474 24.474 0 0 1 10.37 9.5c.534-.066 1.08-.11 1.63-.112z" />
    </svg>
  ),
  FastAPI: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12 6.626 0 12-5.373 12-12 0-6.625-5.373-12-12-12zm-.624 21.62v-7.227H7.19L13.203 2.38v7.228h4.029L11.376 21.62z" />
    </svg>
  ),
};

/* ─────────────────────── DOT CONFIG ───────────────────────── */
const dots = [
  { top: '18%', left: '10%',  size: 7,  color: 'rgba(255,122,0,0.55)', dur: 4.2, dx: 8,  dy: -12 },
  { top: '35%', left: '5%',   size: 5,  color: 'rgba(255,82,82,0.45)', dur: 5.8, dx: -6, dy: 10  },
  { top: '60%', left: '8%',   size: 6,  color: 'rgba(255,122,0,0.35)', dur: 3.9, dx: 10, dy: 8   },
  { top: '15%', right: '12%', size: 6,  color: 'rgba(255,82,82,0.5)',  dur: 6.1, dx: -8, dy: -10 },
  { top: '45%', right: '6%',  size: 5,  color: 'rgba(255,122,0,0.4)', dur: 4.7, dx: 7,  dy: 12  },
  { top: '70%', right: '10%', size: 7,  color: 'rgba(255,82,82,0.35)', dur: 5.3, dx: -9, dy: -7  },
  { top: '82%', left: '25%',  size: 5,  color: 'rgba(255,122,0,0.3)', dur: 4.5, dx: 6,  dy: 9   },
  { top: '25%', left: '55%',  size: 4,  color: 'rgba(255,82,82,0.25)', dur: 6.8, dx: -5, dy: -8  },
  { top: '50%', left: '18%',  size: 4,  color: 'rgba(255,122,0,0.2)', dur: 7.2, dx: 8,  dy: 6   },
  { top: '88%', right: '28%', size: 5,  color: 'rgba(255,82,82,0.3)', dur: 5.0, dx: -7, dy: -10 },
];

/* ─────────────────────── COMPONENT ────────────────────────── */
export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full min-h-screen overflow-y-auto py-24 px-6 md:px-24 flex flex-col justify-start select-none relative"
      style={{
        background: 'linear-gradient(135deg, #fff8f5 0%, #fff3ee 50%, #fff8f5 100%)',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
      }}
    >
      {/* ════════════════ ANIMATED BACKGROUND ════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* ── Big coral orb — top-left: float + breathe ── */}
        <motion.div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, #ff7a00 0%, #ff5252 60%, transparent 80%)',
            opacity: 0.82,
          }}
          animate={{
            y: [0, -22, 0, 14, 0],
            x: [0, 10, 0, -8, 0],
            scale: [1, 1.07, 1, 0.95, 1],
            opacity: [0.82, 0.95, 0.82, 0.72, 0.82],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Spinning ring — top-left inner ── */}
        <motion.div
          className="absolute top-6 left-6 w-20 h-20 rounded-full"
          style={{
            border: '2px solid rgba(255,122,0,0.4)',
            background: 'transparent',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-10 left-10 w-12 h-12 rounded-full"
          style={{
            border: '1.5px dashed rgba(255,82,82,0.3)',
            background: 'transparent',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* ── Big coral orb — bottom-right: float opposite phase ── */}
        <motion.div
          className="absolute -bottom-24 -right-16 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, #ff5252 0%, #ff7a00 55%, transparent 80%)',
            opacity: 0.78,
          }}
          animate={{
            y: [0, 18, 0, -14, 0],
            x: [0, -10, 0, 8, 0],
            scale: [1, 0.94, 1, 1.08, 1],
            opacity: [0.78, 0.65, 0.78, 0.9, 0.78],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Spinning ring — bottom-right inner ── */}
        <motion.div
          className="absolute bottom-8 right-8 w-16 h-16 rounded-full"
          style={{
            border: '2px solid rgba(255,82,82,0.35)',
            background: 'transparent',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* ── Ambient glow blobs (soft, slow) ── */}
        <motion.div
          className="absolute top-1/3 -left-20 w-52 h-52 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,122,0,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-2/3 -right-16 w-48 h-48 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,82,82,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />

        {/* ── Drifting dots ── */}
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: dot.top,
              left: dot.left,
              right: dot.right,
              width: dot.size,
              height: dot.size,
              background: dot.color,
            }}
            animate={{
              y: [0, dot.dy, 0, -dot.dy * 0.6, 0],
              x: [0, dot.dx, 0, -dot.dx * 0.5, 0],
              opacity: [0.6, 1, 0.6, 0.9, 0.6],
              scale: [1, 1.4, 1, 0.8, 1],
            }}
            transition={{
              duration: dot.dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.35,
            }}
          />
        ))}

        {/* ── Subtle grid ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,122,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.025) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ════════════════ CONTENT ════════════════ */}
      <div className="max-w-4xl mx-auto w-full relative z-10">

        {/* ── Animated Header ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.span
            className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase mb-3 px-3 py-1 rounded-full border"
            style={{
              color: '#ff5252',
              borderColor: 'rgba(255,82,82,0.18)',
              background: 'rgba(255,82,82,0.06)',
            }}
            animate={{
              boxShadow: [
                '0 0 0px rgba(255,82,82,0)',
                '0 0 12px rgba(255,82,82,0.3)',
                '0 0 0px rgba(255,82,82,0)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            MY WORK
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-2">
            Selected{' '}
            <motion.span
              className="italic"
              style={{
                background: 'linear-gradient(90deg, #ff7a00, #ff5252)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
              animate={{ skewX: [0, -1.5, 0, 1.5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              Projects
            </motion.span>
          </h2>

          {/* Animated underline that expands */}
          <motion.div
            className="h-[2px] mx-auto mt-5 rounded-full"
            style={{ background: 'linear-gradient(90deg, #ff7a00, #ff5252)' }}
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          />
        </motion.div>

        {/* ── Projects Grid ── */}
        <div className="grid md:grid-cols-2 gap-8">
          {projectsList.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -8,
                scale: 1.015,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              className="group relative flex flex-col overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.93)',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255,122,0,0.12)',
                boxShadow: '0 8px 32px rgba(255,122,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Animated glow border on hover */}
              <motion.div
                className="absolute inset-0 rounded-[1.5rem] pointer-events-none"
                style={{ zIndex: 0 }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="absolute inset-0 rounded-[1.5rem]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,122,0,0.15) 0%, rgba(255,82,82,0.15) 100%)',
                  }}
                />
              </motion.div>

              {/* Shimmer sweep on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-[1.5rem]"
                style={{ zIndex: 1 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                    backgroundPosition: '-100% 0',
                  }}
                  whileHover={{
                    backgroundPosition: ['−100% 0', '200% 0'],
                    transition: { duration: 0.6, ease: 'easeInOut' },
                  }}
                />
              </motion.div>

              {/* ── LIVE badge ── */}
              <motion.div
                className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 shadow-sm border border-gray-100"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(74,222,128,0)',
                    '0 0 10px rgba(74,222,128,0.4)',
                    '0 0 0px rgba(74,222,128,0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="text-[10px] font-bold tracking-widest text-green-600">
                  {project.status}
                </span>
              </motion.div>

              {/* ── Project image ── */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden relative z-10"
                style={{ borderRadius: '1.5rem 1.5rem 0 0', background: project.imgBg }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-48 ${project.imgFit}`}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </a>

              {/* ── Card body ── */}
              <div className="flex flex-col gap-3 p-5 relative z-10">
                {/* Title + subtitle */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {project.title}
                  </h3>
                  <p
                    className="text-sm font-semibold mt-0.5"
                    style={{
                      background: 'linear-gradient(90deg, #ff7a00, #ff5252)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {project.subtitle}
                  </p>
                </motion.div>

                {/* Animated divider */}
                <motion.div
                  className="h-px"
                  style={{ background: 'rgba(0,0,0,0.06)' }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                />

                {/* Tech Stack */}
                <div>
                  <motion.p
                    className="text-[9px] font-bold tracking-[0.2em] uppercase mb-2"
                    style={{ color: '#9ca3af' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45 + index * 0.15 }}
                  >
                    TECH STACK
                  </motion.p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, ti) => (
                      <motion.span
                        key={tech}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium cursor-default"
                        style={{
                          background: 'rgba(255,122,0,0.07)',
                          color: '#374151',
                          border: '1px solid rgba(255,122,0,0.15)',
                        }}
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.35,
                          delay: 0.55 + index * 0.15 + ti * 0.07,
                          type: 'spring',
                          stiffness: 280,
                          damping: 18,
                        }}
                        whileHover={{
                          scale: 1.12,
                          background: 'rgba(255,122,0,0.18)',
                          borderColor: 'rgba(255,122,0,0.45)',
                          transition: { duration: 0.15 },
                        }}
                      >
                        {techIcons[tech] && (
                          <motion.span
                            style={{ color: '#ff7a00' }}
                            animate={{ rotate: [0, 8, -8, 0] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: ti * 0.4,
                            }}
                          >
                            {techIcons[tech]}
                          </motion.span>
                        )}
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
