import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FullPageScroll from './components/FullPageScroll';
import Hero from './components/Hero';
import CodingStats from './components/CodingStats';
// import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import staticData from './components/statiData/staticData.json';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // In a real app we might fetch this, but here we import it directly
    setData(staticData);
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  // Merge profilePic and resume from root level into personalInfo if they exist
  const personalInfoWithPic = {
    ...data.personalInfo,
    ...(data.profilePic && { profilePic: data.profilePic }),
    ...(data.resume && { resume: data.resume })
  };

  return (
    <div className="antialiased">
      <Navbar />
      <main>
        <FullPageScroll>
          <Hero personalInfo={personalInfoWithPic} />
          <CodingStats />
          {/* <Experience experience={data.experience} /> */}
          <Projects projects={data.projects} />
          <Skills skills={data.skills} />
          <Education education={data.education} />
          <Certifications certifications={data.certifications} />
        </FullPageScroll>
      </main>
      
      <footer className="py-12 px-8 md:px-24 relative"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
          borderTop: '1px solid rgba(255, 82, 82, 0.15)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-red rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-tr-full"></div>
            </div>
            <span className="font-serif italic text-xl text-gray-900">{data.personalInfo.name}</span>
          </div>
          
          <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase text-gray-500">
            <p>© 2026 {data.personalInfo.name}</p>
            <a href={`mailto:${data.personalInfo.email}`} className="hover:text-brand-red transition-colors duration-300">Email</a>
            <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors duration-300">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
