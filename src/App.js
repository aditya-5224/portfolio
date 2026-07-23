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
import Connect from './components/Connect';
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
          <Projects />
          <Skills skills={data.skills} />
          <Education education={data.education} />
          <Certifications certifications={data.certifications} />
          <Connect personalInfo={personalInfoWithPic} />
        </FullPageScroll>
      </main>
    </div>
  );
}
