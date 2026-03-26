
# Aditya Yadav - Portfolio Website

A modern, fully-responsive portfolio website showcasing professional experience, projects, skills, education, and certifications. Built with React and Vite, featuring smooth animations and interactive 3D elements.

## ✨ Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **3D Visualizations**: Three.js integration for interactive 3D elements
- **Modern UI**: Tailwind CSS for clean, modern styling
- **Fast Performance**: Vite for lightning-fast development and build times
- **Dynamic Content**: JSON-based data structure for easy content updates
- **Contact Integration**: Direct email and social media links
- **Professional Sections**: 
  - Hero section with personal introduction
  - Experience timeline
  - Skills categorization
  - Project showcase
  - Education details
  - Certifications
  - Navigation bar

---

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern UI library with hooks
- **Vite 6.4**: Next-generation build tool
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Production-ready animation library
- **Three.js**: 3D graphics library
- **JavaScript**: Core language

### Build & Development
- **Node.js**: Runtime environment
- **npm**: Package manager
- **Vite config**: Optimized bundling and HMR

### Design & Styling
- **Tailwind CSS**: Responsive utility classes
- **Custom CSS**: Additional styling and animations

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.js              # Navigation bar component
│   │   ├── Hero.js                # Hero/banner section
│   │   ├── Experience.js          # Work experience section
│   │   ├── Projects.js            # Projects showcase
│   │   ├── Skills.js              # Technical skills display
│   │   ├── Education.js           # Education information
│   │   ├── Certifications.js      # Certifications section
│   │   └── statiData/
│   │       └── staticData.json    # All portfolio content
│   ├── App.js                     # Main application component
│   ├── main.js                    # React entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML entry point
├── package.json                   # Project dependencies
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript config
└── README.md                      # This file
```

---

## 📋 Content Structure

### Personal Information
- **Name**: Aditya Yadav
- **Title**: Full-Stack Developer
- **Role**: Computer Science Student
- **Contact**: 
  - Email: yad.tya5224@gmail.com
  - Phone: 7068731914
  - LinkedIn: linkedin.com/in/aditya-yadav-10a16737a
  - GitHub: github.com/aditya-5224

### Experience Highlights
- **DSA & Problem Solving Practitioner** (2025 - Present)
  - 260+ LeetCode problems solved (160 Easy, 95 Medium, 9 Hard)
  - LeetCode contest rating: 1464 (Top 56.66%)
  - 195+ active days on LeetCode with max 33-day streak
  - 54 Codeforces problems solved
  - 99 GeeksforGeeks problems solved
  - 496+ submissions in the past year

### Education
- **Bachelor of Technology in Computer Science**
  - Pranveer Singh Institute of Technology, Kanpur, Uttar Pradesh
  - Expected Graduation: 2029

### Certifications
1. **McKinsey Forward Program** - McKinsey & Company (March 2025)
2. **Software Engineering Job Simulation** - JPMorgan Chase & Co./Forage (October 2025)
3. **Data Analytics Job Simulation** - Deloitte/Forage (September 2025)

### Skills Categories
- **Programming**: Python, JavaScript, Node.js, C, C++, Java, Perl, HTML, CSS
- **Distributed Systems**: Scalability, Fault-tolerance, Distributed Storage, Redis Cluster, Kafka
- **Web Technologies**: React, Express, RESTful APIs
- **Backend**: Node.js, Express, FastAPI, JWT Authentication
- **Databases**: MongoDB, Redis, Relational Databases
- **Tools**: Git, GitHub, VS Code, Docker, Framer Motion, Three.js, Streamlit
- **CS Fundamentals**: OOD, Algorithm Design, Data Structures, System Design
- **Other**: Agile, Debugging, Unit Testing, Code Review, Workflow Automation

### Projects
1. **Enterprise Payment Integration Platform**
   - Tech: Node.js, Express, MongoDB, Redis, Kafka, Docker, JWT
   - Built for 1M+ concurrent users with horizontal scaling

2. **Cloud Burst Prediction System**
   - Tech: Python, FastAPI, Redis, Docker, Streamlit, ML models
   - 493 advanced time-series features engineered

3. **Portfolio Website**
   - Tech: React, Node.js, Express, MongoDB, Framer Motion, Three.js
   - 3D animations with secure REST APIs

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at: `http://localhost:3000` or `http://localhost:3001` (if port 3000 is in use)

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Lint TypeScript**:
   ```bash
   npm run lint
   ```

---

## 📝 Updating Content

All portfolio content is stored in **`src/components/statiData/staticData.json`**. To update your portfolio:

1. Open `staticData.json`
2. Update relevant sections:
   - `personalInfo`: Your contact details and summary
   - `experience`: Work experience and achievements
   - `education`: Educational background
   - `certifications`: Certifications and credentials
   - `skills`: Categorized technical skills
   - `projects`: Portfolio projects with descriptions

3. Save the file - changes will auto-reload in the browser (HMR enabled)

### Example: Adding a New Skill
```json
"skills": {
  "programming": ["Python", "JavaScript", "Node.js", "..."]
}
```

---

## 🎨 Component Overview

### Navbar
- Navigation links to all major sections
- Responsive hamburger menu for mobile
- Smooth scroll navigation

### Hero
- Eye-catching introduction banner
- Personal branding and call-to-action
- Links to GitHub and LinkedIn

### Experience
- Timeline of professional achievements
- Detailed highlights of DSA and problem-solving journey
- Motivation and impact metrics

### Skills
- Organized by categories (programming, web, backend, etc.)
- Visual skill tags
- Easy to scan and reference

### Projects
- Featured project showcase
- Technology tags for each project
- Detailed project descriptions

### Education
- Degree information
- Institution and expected graduation date

### Certifications
- Achievement certificates and completions
- Issuing organizations
- Dates and descriptions

---

## 🎯 Key Highlights

✅ **Strong DSA Foundation**: 260+ problems solved across multiple platforms
✅ **Competitive Coding**: Active participation with proven rankings
✅ **Modern Tech Stack**: React, Node.js, MongoDB, Redis, Kafka
✅ **Full-Stack Capabilities**: Frontend to backend development
✅ **Problem Solver**: Distributed systems, scalability, microservices
✅ **Continuous Learner**: Certifications from McKinsey, JPMorgan Chase, Deloitte

---

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop** (1920px and above)
- **Laptop** (1024px - 1919px)
- **Tablet** (768px - 1023px)
- **Mobile** (below 768px)

---

## 🔧 Customization

### Styling
- Global styles: `src/index.css`
- Component styles: Tailwind utility classes
- Theme colors defined in Tailwind config

### Animations
- Entry animations on page scroll (Framer Motion)
- Hover effects on interactive elements
- Smooth transitions between sections

### Colors
- **Primary Red**: #ff5252 (brand color)
- **Background**: White and light grays
- **Text**: Dark gray and black

---

## 📦 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Clean build artifacts
npm run clean

# Lint TypeScript
npm run lint
```

---

## 🌍 Deployment

To deploy this portfolio:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting platform:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting service

---

## 📞 Contact & Links

- **Email**: yad.tya5224@gmail.com
- **Phone**: 7068731914
- **LinkedIn**: [linkedin.com/in/aditya-yadav-10a16737a](https://linkedin.com/in/aditya-yadav-10a16737a)
- **GitHub**: [github.com/aditya-5224](https://github.com/aditya-5224)

---

## 📄 License

This portfolio project is personal and created for showcasing professional work.

---

## 🎓 About Aditya Yadav

Dedicated Computer Science student with hands-on project experience designing and building innovative technologies in distributed computing environments. Proficient in Computer Science fundamentals including Object-Oriented Design (OOD), algorithm design, and complexity analysis. Proven ability to create scalable, fault-tolerant solutions for large-scale distributed systems, including microservices and RESTful APIs.

**Key Interests**: 
- Distributed Systems & Scalability
- Competitive Programming & DSA
- Full-Stack Development
- System Design
- Problem Solving

---

**Last Updated**: March 2026
**Version**: 1.0.0
