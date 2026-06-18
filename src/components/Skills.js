import React, { useMemo, useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// Skill Icons mapping standard SVGs
const SkillIcon = ({ name, size = 32 }) => {
  const icons = {
    html5: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M1.5 22L0 0H24L22.5 22L12 24L1.5 22Z" fill="#E34F26" />
        <path d="M12 22.1L20.4 19.8L21.6 2.3H12V22.1Z" fill="#EF652A" />
        <path d="M12 9.5H16.8L16.4 14.1L12 15.3V18L17.7 16.4L18.4 8H12V9.5ZM12 4.1H19L19.2 2H4.8L5.7 11.5H12V4.1Z" fill="white" />
        <path d="M12 9.5V8H5.4L5.7 11.5H12V9.5ZM12 15.3L7.6 14.1L7.3 11.5H4.9L5.4 16.4L12 18V15.3Z" fill="#EBEBEB" />
      </svg>
    ),
    css3: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M1.5 22L0 0H24L22.5 22L12 24L1.5 22Z" fill="#1572B6" />
        <path d="M12 22.1L20.4 19.8L21.6 2.3H12V22.1Z" fill="#33A9DC" />
        <path d="M12 9.5H16.8L16.4 14.1L12 15.3V18L17.7 16.4L18.4 8H12V9.5ZM12 4.1H19L19.2 2H4.8L5.7 11.5H12V4.1Z" fill="white" />
        <path d="M12 9.5V8H5.4L5.7 11.5H12V9.5ZM12 15.3L7.6 14.1L7.3 11.5H4.9L5.4 16.4L12 18V15.3Z" fill="#EBEBEB" />
      </svg>
    ),
    sass: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#CF649A" />
        <path d="M12 4.5C8 4.5 5.5 7.5 5.5 12C5.5 16.5 8 19.5 12 19.5C16 19.5 18.5 16.5 18.5 12C18.5 7.5 16 4.5 12 4.5ZM12.2 16.2C10.5 16.2 9.2 14.8 9.2 12C9.2 9.2 10.5 7.8 12.2 7.8C13.9 7.8 15.2 9.2 15.2 12C15.2 14.8 13.9 16.2 12.2 16.2Z" fill="white" />
      </svg>
    ),
    javascript: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3" fill="#F7DF1E" />
        <path d="M12.9 16.2c.2.8.6 1.4 1.5 1.4.9 0 1.4-.5 1.4-1.2 0-1.9-2.9-2-2.9-4.8 0-1.4 1-2.6 2.8-2.6 1.5 0 2.4.9 2.7 2.1l-1.5.9c-.2-.7-.6-1.1-1.2-1.1-.6 0-.9.4-.9.9 0 1.7 2.9 1.7 2.9 4.6 0 1.9-1.4 2.8-3.2 2.8-2.1 0-3.3-1.1-3.6-3l1.8-.9zm-6.2-.2c.2.6.7 1 1.4 1 .6 0 .9-.3.9-.9V9.1h1.9v7.1c0 1.7-1.1 2.8-2.8 2.8-1.7 0-2.8-.9-3.1-2.5l1.7-.5z" fill="#303030" />
      </svg>
    ),
    typescript: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3" fill="#3178C6" />
        <path d="M16.8 17.5c-.3.8-.9 1.4-1.8 1.4-1 0-1.7-.6-1.8-1.5l1.5-.7c.1.4.3.7.6.7.3 0 .4-.2.4-.4v-8.4h1.7v8.5c0 .3.2.4.4.4zm3.6-.1c-.3.7-.9 1.2-1.8 1.2-.9 0-1.5-.5-1.7-1.2l1.4-.7c.1.3.3.5.5.5.3 0 .4-.2.4-.4 0-1-.8-1.1-1.7-1.8-.8-.6-1.4-1.3-1.4-2.3 0-1.2.9-2.2 2.3-2.2 1.3 0 2 1 2.2 1.8l-1.4.7c-.1-.3-.3-.5-.6-.5-.3 0-.5.2-.5.5 0 .8.7.9 1.5 1.6.8.6 1.4 1.2 1.4 2.3 0 1.2-1 2.2-2.3 2.2z" fill="white" />
      </svg>
    ),
    react: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-[spin_20s_linear_infinite]">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
        <path d="M12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7Z" stroke="#61DAFB" strokeWidth="1.2" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)" />
      </svg>
    ),
    nextjs: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="black" stroke="white" strokeWidth="0.8" />
        <path d="M7.5 7.5V16.5H9.5V10.8L15.3 16.5H16.5V7.5H14.5V13.2L8.7 7.5H7.5Z" fill="white" />
      </svg>
    ),
    nodejs: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="#339933" />
        <path d="M12 5L6 8.3V15.7L12 19L18 15.7V8.3L12 5Z" fill="#5FA04E" />
        <path d="M12 9.5V14.5M10 11H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    express: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3" fill="#353535" />
        <text x="12" y="16" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ex</text>
      </svg>
    ),
    mongodb: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C11.5 2.5 9.5 6 9.5 9C9.5 13 11.5 15.5 12 16C12.5 15.5 14.5 13 14.5 9C14.5 6 12.5 2.5 12 2Z" fill="#47A248" />
        <path d="M12 2C12.2 2.5 13.5 6 13.5 9C13.5 13 12.2 15.5 12 16V2Z" fill="#589636" />
        <path d="M12 16V22" stroke="#47A248" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    postgresql: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17H8V14H11V17ZM16 11H13V8H16V11Z" fill="#336791" />
        <path d="M12 5C9 5 6 7.5 6 11C6 14.5 9 17 12 17C15 17 18 14.5 18 11C18 7.5 15 5 12 5ZM12 14.5C10 14.5 8.5 13 8.5 11C8.5 9 10 7.5 12 7.5C14 7.5 15.5 9 15.5 11C15.5 13 14 14.5 12 14.5Z" fill="#4169E1" />
      </svg>
    ),
    graphql: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z" fill="#E10098" opacity="0.1" />
        <polygon points="12,3 20,8 20,16 12,21 4,16 4,8" stroke="#E10098" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="3" r="1.5" fill="#E10098" />
        <circle cx="20" cy="8" r="1.5" fill="#E10098" />
        <circle cx="20" cy="16" r="1.5" fill="#E10098" />
        <circle cx="12" cy="21" r="1.5" fill="#E10098" />
        <circle cx="4" cy="16" r="1.5" fill="#E10098" />
        <circle cx="4" cy="8" r="1.5" fill="#E10098" />
        <path d="M12 3L20 16M20 16L4 16M4 16L12 3M20 8L12 21M12 21L4 8M4 8L20 8" stroke="#E10098" strokeWidth="1" />
      </svg>
    ),
    java: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 19C7.5 21.5 16.5 21.5 20 19C17 19.5 7 19.5 4 19Z" fill="#E76F51" />
        <path d="M7 15C8.5 17 15.5 17 17 15C15 15.5 9 15.5 7 15Z" fill="#F4A261" />
        <path d="M9 11C9 11 11 8 10 5C12 7 12 9 11 11H9Z" fill="#264653" />
        <path d="M13 10C13 10 15 7 14 4C16 6 16 8 15 10H13Z" fill="#2A9D8F" />
        <path d="M6 13C8 13.5 16 13.5 18 13C17 14 7 14 6 13Z" fill="#E76F51" />
      </svg>
    ),
    python: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M11.9 2C8.6 2 8.3 2.1 7.2 2.6C6.1 3.1 5.2 3.9 4.7 5C4.1 6.2 4.1 6.8 4.1 10.1V11.6H8.3V12.1H4.1C2.1 12.1 2 12.2 2 13.2C2 14.3 2 14.9 2.5 16C3 17.1 3.8 18 4.9 18.5C6.1 19.1 6.7 19.1 10.1 19.1H11.6V14.9H7.4V13.4H11.9V13.1H16.1C18.1 13.1 18.2 13 18.2 12C18.2 10.9 18.2 10.3 17.7 9.2C17.2 8.1 16.4 7.2 15.3 6.7C14.1 6.1 13.5 6.1 10.1 6.1H8.6V10.3H11.9V2Z" fill="#3776AB" />
        <path d="M12.1 22C15.4 22 15.7 21.9 16.8 21.4C17.9 20.9 18.8 20.1 19.3 19C19.9 17.8 19.9 17.2 19.9 13.9V12.4H15.7V11.9H19.9C21.9 11.9 22 11.8 22 10.8C22 9.7 22 9.1 21.5 8C21 6.9 20.2 6 19.1 5.5C17.9 4.9 17.3 4.9 13.9 4.9H12.4V9.1H16.6V10.6H12.1V10.9H7.9C5.9 10.9 5.8 11 5.8 12C5.8 13.1 5.8 13.7 6.3 14.8C6.8 15.9 7.6 16.8 8.7 17.3C9.9 17.9 10.5 17.9 13.9 17.9H15.4V13.7H12.1V22Z" fill="#FFE873" />
        <circle cx="8.5" cy="5.5" r="0.8" fill="white" />
        <circle cx="15.5" cy="18.5" r="0.8" fill="black" />
      </svg>
    ),
    git: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M23.2 11.2L12.8 0.8C12.4 0.4 11.6 0.4 11.2 0.8L0.8 11.2C0.4 11.6 0.4 12.4 0.8 12.8L11.2 23.2C11.6 23.6 12.4 23.6 12.8 23.2L23.2 12.8C23.6 12.4 23.6 11.6 23.2 11.2ZM17.1 13.6C16.8 14.1 16.3 14.4 15.7 14.5V17.5C15.7 18.5 14.9 19.3 13.9 19.3C12.9 19.3 12.1 18.5 12.1 17.5C12.1 16.9 12.4 16.4 12.9 16.1V13.1C12.4 12.8 12.1 12.3 12.1 11.7C12.1 11.1 12.4 10.6 12.9 10.3V7.3C12.4 7 12.1 6.5 12.1 5.9C12.1 4.9 12.9 4.1 13.9 4.1C14.9 4.1 15.7 4.9 15.7 5.9C15.7 6.5 15.4 7 14.9 7.3V10.3C15.4 10.6 15.7 11.1 15.7 11.7C15.7 12.3 15.4 12.8 14.9 13.1V14.1C15.2 14.1 15.4 14 15.6 13.9L17.1 13.6Z" fill="#F05032" />
      </svg>
    ),
    github: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.477 2 2 6.484 2 12.017C2 16.442 4.87 20.18 8.854 21.507C9.354 21.6 9.537 21.29 9.537 21.028C9.537 20.793 9.529 20.17 9.525 19.34C6.743 19.944 6.155 18.01 6.155 18.01C5.7 16.857 5.045 16.55 5.045 16.55C4.137 15.932 5.114 15.944 5.114 15.944C6.118 16.015 6.646 16.979 6.646 16.979C7.538 18.514 8.99 18.07 9.562 17.815C9.653 17.165 9.912 16.723 10.198 16.472C7.977 16.22 5.642 15.357 5.642 11.513C5.642 10.418 6.033 9.522 6.673 8.82C6.57 8.567 6.227 7.546 6.772 6.168C6.772 6.168 7.61 5.9 9.517 7.189C10.312 6.969 11.168 6.859 12.019 6.855C12.87 6.859 13.726 6.969 14.523 7.189C16.427 5.9 17.263 6.168 17.263 6.168C17.809 7.546 17.466 8.567 17.364 8.82C18.006 9.522 18.393 10.418 18.393 11.513C18.393 15.367 16.055 16.217 13.827 16.464C14.185 16.774 14.502 17.387 14.502 18.324C14.502 19.664 14.49 20.748 14.49 21.028C14.49 21.3 14.671 21.61 15.18 21.502C19.16 20.175 22 16.442 22 12.017C22 6.484 17.522 2 12 2Z" fill="#181717" />
      </svg>
    ),
    docker: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M13.9 10.1H16.2V12.4H13.9V10.1ZM13.9 7.3H16.2V9.6H13.9V7.3ZM11.1 10.1H13.4V12.4H11.1V10.1ZM11.1 7.3H13.4V9.6H11.1V7.3ZM8.3 10.1H10.6V12.4H8.3V10.1ZM8.3 7.3H10.6V9.6H8.3V7.3ZM5.5 10.1H7.8V12.4H5.5V10.1ZM11.1 4.5H13.4V6.8H11.1V4.5ZM2.2 11.6C2.2 15.6 5.5 18.9 9.5 18.9H17.2C20.6 18.9 22.8 16.2 22.8 13.3C22.8 11.9 21.9 10.9 20.7 10.9H19.5V8.7C19.5 8.1 19 7.6 18.4 7.6H17.2V10.9H16.2V12.9H2.2V11.6Z" fill="#2496ED" />
      </svg>
    ),
    firebase: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M3.89 18.4L2.1 9.1C2 8.7 2.3 8.4 2.7 8.5L5.7 9.8L3.89 18.4Z" fill="#FFC107" />
        <path d="M12 2L9.1 7.6L3.89 18.4L12 22L20.1 18.4L14.9 2L12 22Z" fill="#FF9800" />
        <path d="M12 22L20.1 18.4L21.9 9.1C22 8.7 21.7 8.4 21.3 8.5L18.3 9.8L12 22Z" fill="#FFC107" />
        <path d="M12 22L9.1 7.6L14.9 2L12 22Z" fill="#DD2C00" />
      </svg>
    ),
    vscode: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M22.8 4.7L16.2 0.3C15.8 0 15.2 0.2 15 0.7L11.5 7.4L3.8 1.9C3.4 1.6 2.8 1.8 2.6 2.3L0.2 6.7C0 7.1 0.1 7.7 0.5 8L6.8 12L0.5 16C0.1 16.3 0 16.9 0.2 17.3L2.6 21.7C2.8 22.2 3.4 22.4 3.8 22.1L11.5 16.6L15 23.3C15.2 23.8 15.8 24 16.2 23.7L22.8 19.3C23.2 19 23.4 18.4 23.4 17.9V6.1C23.4 5.6 23.2 5 22.8 4.7ZM16.2 16.5V7.5L20.4 12L16.2 16.5Z" fill="#007ACC" />
      </svg>
    ),
    clerk: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#2F3037" />
        <circle cx="12" cy="12" r="7" stroke="#6C47FF" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="3" fill="#6C47FF" />
      </svg>
    ),
    sql: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="9" ry="3" fill="#00758F" />
        <path d="M3 5V11C3 12.66 7.03 14 12 14C16.97 14 21 12.66 21 11V5C21 6.66 16.97 8 12 8C7.03 8 3 6.66 3 5Z" fill="#00758F" opacity="0.8" />
        <path d="M3 11V17C3 18.66 7.03 20 12 20C16.97 20 21 18.66 21 17V11C21 12.66 16.97 14 12 14C7.03 14 3 12.66 3 11Z" fill="#00758F" opacity="0.6" />
      </svg>
    ),
    mysql: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11.5 15.5C9.5 15.5 8 14 8 12C8 10 9.5 8.5 11.5 8.5C13.5 8.5 15 10 15 12C15 14 13.5 15.5 11.5 15.5Z" fill="#00758F" />
        <path d="M12.1 5.5C14.1 5.5 17 8 17 11C17 14 14.9 16.5 12.1 16.5C10.5 16.5 9 15 9 13.1C9 11.2 10.5 9.8 12.1 9.8C13.7 9.8 15 11.1 15 12.8C15 14.5 13.7 15.5 12.1 15.5" fill="#F29111" />
      </svg>
    )
  };
  return icons[name.toLowerCase().replace(/[^a-z0-9]/g, '')] || (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#ccc" />
      <text x="12" y="15" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">{name.slice(0, 2).toUpperCase()}</text>
    </svg>
  );
};

// Technology theme colors mapping for rings and highlights
const techThemeColors = {
  html5: '#e34f26',
  css3: '#1572b6',
  sass: '#cf649a',
  javascript: '#f7df1e',
  typescript: '#3178c6',
  react: '#61dafb',
  nextjs: '#000000',
  nodejs: '#339933',
  express: '#353535',
  mongodb: '#47a248',
  postgresql: '#336791',
  graphql: '#e10098',
  java: '#e76f51',
  python: '#3776ab',
  git: '#f05032',
  github: '#181717',
  docker: '#2496ed',
  firebase: '#ffc107',
  vscode: '#007acc',
  clerk: '#6c47ff',
  sql: '#00758f',
  mysql: '#00758f'
};

// 3D Card Tilt Component
const TiltCard = ({ children, className }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    const maxRotate = 8;
    const rX = -(mouseY / (height / 2)) * maxRotate;
    const rY = (mouseX / (width / 2)) * maxRotate;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
};

// Skill Card Progress Bar Component
const SkillCard = ({ name, percentage }) => {
  const [width, setWidth] = useState(0);
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const themeColor = techThemeColors[key] || '#ff5252';

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <TiltCard className="group p-5 rounded-2xl border cursor-pointer relative overflow-hidden" style={{
      background: 'rgba(255,255,255,0.85)',
      borderColor: 'rgba(0,0,0,0.06)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
    }}>
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${themeColor}18, transparent 70%)` }}
      />
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{ background: `${themeColor}15`, border: `1.5px solid ${themeColor}40` }}
        >
          <SkillIcon name={name} size={28} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-baseline">
            <h4 className="text-sm font-bold text-gray-900">{name}</h4>
            <span 
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ color: themeColor, background: `${themeColor}15` }}
            >
              {percentage}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-1.5 relative z-10">
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
          <div 
            className="h-full rounded-full transition-all duration-1200 ease-out" 
            style={{ 
              width: `${width}%`,
              background: `linear-gradient(90deg, ${themeColor}, ${themeColor}cc)`,
              boxShadow: `0 0 8px ${themeColor}60`
            }} 
          />
        </div>
        <div className="flex justify-between text-[9px] text-gray-400 font-bold uppercase tracking-wider">
          <span>Basic</span>
          <span>Advanced</span>
          <span>Expert</span>
        </div>
      </div>
    </TiltCard>
  );
};

// Infinite Marquee Row for All Skills
const InfiniteMarquee = ({ items, speed = 20, direction = 'left' }) => {
  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #ffffff, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg, #ffffff, transparent)' }} />
      <motion.div
        className="flex gap-5 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          ease: 'linear',
          duration: speed,
          repeat: Infinity
        }}
        style={{ width: 'max-content' }}
      >
        {[...items, ...items].map((skill, index) => {
          const key = skill.toLowerCase().replace(/[^a-z0-9]/g, '');
          const themeColor = techThemeColors[key] || '#ff5252';
          return (
            <div 
              key={index}
              className="inline-flex flex-col items-center justify-center hover:scale-110 transition-all duration-300 rounded-2xl w-24 h-24 flex-shrink-0 cursor-pointer group relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.85)',
                border: `1px solid rgba(0,0,0,0.06)`,
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `${themeColor}12` }} />
              <SkillIcon name={skill} size={34} />
              <span className="text-[10px] font-bold text-gray-650 mt-2 text-center group-hover:text-gray-900 transition-colors">{skill}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default function Skills() {
  const tabs = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools' }
  ];

  const skillCategories = {
    frontend: [
      { name: 'HTML5', percentage: 95 },
      { name: 'CSS3', percentage: 90 },
      { name: 'SASS', percentage: 85 },
      { name: 'JavaScript', percentage: 90 },
      { name: 'TypeScript', percentage: 75 },
      { name: 'React', percentage: 90 },
      { name: 'Next.js', percentage: 75 }
    ],
    backend: [
      { name: 'Node.js', percentage: 90 },
      { name: 'Express', percentage: 85 },
      { name: 'MongoDB', percentage: 90 },
      { name: 'PostgreSQL', percentage: 65 },
      { name: 'GraphQL', percentage: 60 },
      { name: 'Java', percentage: 60 },
      { name: 'Python', percentage: 60 }
    ],
    tools: [
      { name: 'Git', percentage: 90 },
      { name: 'GitHub', percentage: 90 },
      { name: 'Docker', percentage: 70 },
      { name: 'Firebase', percentage: 80 },
      { name: 'VS Code', percentage: 95 },
      { name: 'Clerk', percentage: 90 },
      { name: 'SQL', percentage: 90 },
      { name: 'MySQL', percentage: 90 }
    ]
  };

  const allSkillsList = [
    'HTML5', 'CSS3', 'SASS', 'JavaScript', 'TypeScript', 'React', 'Next.js',
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Java', 'Python',
    'Git', 'GitHub', 'Docker', 'Firebase', 'VS Code', 'Clerk', 'SQL', 'MySQL'
  ];

  const row1 = allSkillsList.slice(0, 11);
  const row2 = allSkillsList.slice(11);

  const [activeTab, setActiveTab] = useState('all');

  return (
    <section id="skills" className="w-full h-full overflow-y-auto py-24 px-8 md:px-24 flex flex-col justify-center select-none relative"
      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)' }}
    >
      {/* Floating 3D orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,82,82,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }}
        />
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[30%] right-[8%] w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,82,82,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[15%] left-[25%] w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,82,82,0.06) 0%, transparent 70%)', filter: 'blur(35px)' }}
        />
        {/* Grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,82,82,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,82,82,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${8 + i * 8}%`,
              top: `${15 + (i % 5) * 16}%`,
              background: i % 3 === 0 ? '#ff5252' : i % 3 === 1 ? '#ff7b7b' : '#ff9999',
              boxShadow: `0 0 6px ${i % 3 === 0 ? '#ff5252' : i % 3 === 1 ? '#ff7b7b' : '#ff9999'}`
            }}
            animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] uppercase text-brand-red mb-4 px-4 py-1.5 rounded-full border border-brand-red/30" style={{ background: 'rgba(255,82,82,0.08)' }}>
              Expertise
            </span>
            <h3 className="text-4xl md:text-5xl font-serif italic text-gray-900 mb-3 mt-2">
              My <span style={{ color: '#ff5252' }}>Skills</span>
            </h3>
            <p className="text-gray-550 text-sm font-medium">
              Technologies I've mastered and my proficiency levels
            </p>
          </motion.div>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 flex-wrap mb-14">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-7 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'text-white border-transparent shadow-lg'
                    : 'text-gray-650 border-gray-200 hover:border-brand-red/50 hover:text-gray-900'
                }`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, #ff5252, #ff3b3b)',
                  boxShadow: '0 0 20px rgba(255,82,82,0.4), 0 4px 15px rgba(255,82,82,0.25)'
                } : { background: 'rgba(0,0,0,0.03)' }}
              >
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Content View */}
        <div className="min-h-[420px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeTab === 'all' ? (
              <motion.div
                key="all-skills"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="w-full space-y-6"
              >
                <InfiniteMarquee items={row1} speed={25} direction="left" />
                <InfiniteMarquee items={row2} speed={25} direction="right" />
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {skillCategories[activeTab]?.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <SkillCard
                      name={skill.name}
                      percentage={skill.percentage}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
