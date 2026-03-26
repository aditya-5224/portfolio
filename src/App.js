import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
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

  if (!data) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

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
        <Hero personalInfo={personalInfoWithPic} />
        <Experience experience={data.experience} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Education education={data.education} />
        <Certifications certifications={data.certifications} />
      </main>
      
      <footer className="py-12 px-8 md:px-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-red rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-tr-full"></div>
            </div>
            <span className="font-serif italic text-xl">{data.personalInfo.name}</span>
          </div>
          
          <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase text-gray-400">
            <p>© 2026 {data.personalInfo.name}</p>
            <a href={`mailto:${data.personalInfo.email}`} className="hover:text-brand-red transition-colors">Email</a>
            <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
