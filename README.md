# 🎨 Portfolio Website

A full-stack portfolio application showcasing projects, certifications, and achievements with a stunning modern UI featuring 3D effects, particle animations, and smooth page transitions.

![Portfolio](https://img.shields.io/badge/Portfolio-Full%20Stack-blue)
![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![License](https://img.shields.io/badge/License-ISC-yellow)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Frontend Routes](#frontend-routes)
- [Development](#development)
- [Production Build](#production-build)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 🌟 Overview

This portfolio application is built with a modern MERN (MongoDB, Express, React, Node.js) stack, featuring:

- **Backend**: RESTful API with JWT authentication, MongoDB database, and comprehensive validation
- **Frontend**: React SPA with stunning visual effects including 3D cards, particle backgrounds, glare hover effects, and smooth animations using Framer Motion

The application is designed to be easily customizable, scalable, and production-ready.

---

## ✨ Features

### Backend Features

- ✅ **RESTful API** - Clean, well-structured endpoints for all resources
- ✅ **JWT Authentication** - Secure authentication for POST, PUT, DELETE operations
- ✅ **MongoDB Integration** - Robust NoSQL database with Mongoose ODM
- ✅ **Data Validation** - Comprehensive validation using Joi
- ✅ **Error Handling** - Global error handling middleware
- ✅ **CORS Enabled** - Cross-origin resource sharing configured
- ✅ **MVC Architecture** - Scalable and maintainable code structure
- ✅ **Environment Configuration** - Secure environment variable management
- ✅ **Pagination Support** - Efficient data retrieval with pagination
- ✅ **Mongoose Indexing** - Optimized database queries

### Frontend Features

- ✨ **Modern UI/UX** - Stunning dark-themed interface with smooth animations
- ✨ **3D Card Effects** - Interactive 3D transformations on hover
- ✨ **Particle Background** - Animated pixel snow effect across all pages
- ✨ **Glare Hover Effects** - Dynamic lighting effects on interactive elements
- ✨ **Page Transitions** - Smooth animated transitions between routes
- ✨ **Responsive Design** - Mobile-friendly and adaptive layouts
- ✨ **Folder Components** - Unique folder-style card displays
- ✨ **Custom Cursor** - Enhanced user interaction with custom cursor effects
- ✨ **Electric Borders** - Animated border effects for visual appeal
- ✨ **Lazy Loading** - Optimized performance with code splitting
- ✨ **React Router** - Client-side routing for SPA experience
- ✨ **Lucide Icons** - Modern, clean iconography

---

## 🚀 Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | v14+ | JavaScript runtime |
| **Express** | 5.2.1 | Web application framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | 9.2.1 | MongoDB object modeling |
| **JWT** | 9.0.3 | Authentication tokens |
| **Joi** | 18.0.2 | Schema validation |
| **CORS** | 2.8.6 | Cross-origin resource sharing |
| **dotenv** | 17.2.4 | Environment variable management |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI library |
| **Vite** | 7.3.1 | Build tool and dev server |
| **React Router** | 6.14.1 | Client-side routing |
| **Framer Motion** | 10.12.16 | Animation library |
| **Axios** | 1.4.0 | HTTP client |
| **Three.js** | 0.160.1 | 3D graphics library |
| **Lucide React** | 0.294.0 | Icon library |
| **Simplex Noise** | 4.0.3 | Procedural noise generation |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (local installation) OR **MongoDB Atlas** account - [Setup Guide](https://www.mongodb.com/docs/manual/installation/)
- **Git** - [Download](https://git-scm.com/)
- **Postman** (optional, for API testing) - [Download](https://www.postman.com/)

### Verify Installation

```bash
node --version    # Should be v14 or higher
npm --version     # Should be 6 or higher
mongod --version  # For local MongoDB
```

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

---

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `Backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration (Local)
MONGO_URI=mongodb://localhost:27017/portfolio

# OR MongoDB Atlas (Cloud)
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production_must_be_complex_and_random
```

**Important Security Notes:**
- Never commit the `.env` file to version control
- Change `JWT_SECRET` to a strong, random string in production
- Use MongoDB Atlas for production deployments

### Frontend Configuration

Create a `.env` file in the `Frontend/` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

For production, update to your deployed backend URL:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

### Generate JWT Token for Testing

Before testing protected endpoints, generate a JWT token:

```bash
cd Backend
node src/utils/tokenGenerator.js
```

Copy the generated token for use in API requests.

---

## 🏃 Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
```
Server runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```
Frontend runs on: `http://localhost:5173` (or next available port)

### Option 2: Using PowerShell (Windows)

**Start Backend:**
```powershell
cd Backend; npm run dev
```

**Start Frontend (new terminal):**
```powershell
cd Frontend; npm run dev
```

### Option 3: Kill Ports and Restart (if ports are in use)

The project includes a VS Code task to kill processes on ports 5000 and 9229:

Run from VS Code: **Terminal → Run Task → Kill Ports and Node**

Or manually:
```powershell
Get-NetTCPConnection -LocalPort 5000,9229 -ErrorAction SilentlyContinue | ForEach-Object { if ($_.OwningProcess) { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue } }
```

### Verify Everything is Running

- **Backend**: Visit `http://localhost:5000` - You should see the API welcome message
- **Frontend**: Visit `http://localhost:5173` - You should see the portfolio homepage
- **MongoDB**: Check connection logs in the backend terminal

---

## 📁 Project Structure

```
portfolio/
│
├── Backend/                          # Backend API Server
│   ├── app.js                        # Express app entry point
│   ├── package.json                  # Backend dependencies
│   ├── .env                          # Environment variables (create this)
│   ├── Postman_Collection.json       # API testing collection
│   ├── README.md                     # Backend documentation
│   ├── QUICK_START.md                # Quick start guide
│   │
│   └── src/
│       ├── config/
│       │   └── db.js                 # MongoDB connection configuration
│       │
│       ├── controllers/              # Request handlers
│       │   ├── achievementsController.js
│       │   ├── certificationsController.js
│       │   └── projectsController.js
│       │
│       ├── middlewares/              # Express middlewares
│       │   ├── authMiddleware.js     # JWT authentication
│       │   └── errorHandler.js       # Global error handler
│       │
│       ├── models/                   # Mongoose schemas
│       │   ├── achievementModel.js
│       │   ├── certificationModel.js
│       │   └── projectModel.js
│       │
│       ├── routes/                   # API route definitions
│       │   ├── achievementsRoutes.js
│       │   ├── certificationsRoutes.js
│       │   └── projectsRoutes.js
│       │
│       └── utils/                    # Utility functions
│           ├── tokenGenerator.js     # JWT token generator
│           └── validators.js         # Joi validation schemas
│
├── Frontend/                         # React Frontend Application
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── eslint.config.js              # ESLint configuration
│   ├── jsrepo.config.ts              # JSRepo configuration
│   ├── .env                          # Environment variables (create this)
│   │
│   ├── public/                       # Static assets
│   │
│   └── src/
│       ├── main.jsx                  # React app entry point
│       ├── App.jsx                   # Main app component with routing
│       ├── App.css                   # App-specific styles
│       ├── index.css                 # Global styles
│       │
│       ├── assets/                   # Images, fonts, etc.
│       │
│       ├── components/               # Reusable React components
│       │   ├── Card.jsx              # Standard card component
│       │   ├── CustomCursor.jsx      # Custom cursor effect
│       │   ├── ElectricBorder.jsx    # Animated border component
│       │   ├── ExampleCards.jsx      # Card examples showcase
│       │   ├── Folder.jsx            # Folder-style card display
│       │   ├── GlareHover.jsx        # Glare hover effect
│       │   ├── Nav.jsx               # Navigation bar
│       │   ├── ParticleBackground.jsx # Particle animation background
│       │   ├── PixelSnow.jsx         # Pixel snow animation
│       │   └── ThreeDCard.jsx        # 3D card component
│       │
│       ├── hooks/                    # Custom React hooks
│       │   └── useMousePosition.js   # Mouse position tracking
│       │
│       ├── pages/                    # Page components
│       │   ├── Home.jsx              # Homepage with latest items
│       │   ├── Projects.jsx          # Projects showcase page
│       │   ├── Achievements.jsx      # Achievements display
│       │   └── Certifications.jsx    # Certifications list
│       │
│       ├── services/                 # API service layer
│       │   └── api.js                # Axios instance configuration
│       │
│       ├── styles/                   # CSS stylesheets
│       │   ├── background.css        # Background styles
│       │   ├── card3d.css            # 3D card effects
│       │   ├── cursor.css            # Custom cursor styles
│       │   ├── global.css            # Global styles
│       │   ├── nav.css               # Navigation styles
│       │   └── PixelSnow.css         # Pixel snow animations
│       │
│       └── utils/                    # Utility functions
│           └── getLinkIcon.jsx       # Link icon resolver
│
└── README.md                         # This file
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Endpoints

#### **Projects API**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/projects` | Get all projects (paginated) | ❌ |
| `GET` | `/projects/:id` | Get single project by ID | ❌ |
| `POST` | `/projects` | Create new project | ✅ |
| `PUT` | `/projects/:id` | Update existing project | ✅ |
| `DELETE` | `/projects/:id` | Delete project | ✅ |

**Project Schema:**
```json
{
  "title": "String (required)",
  "description": "String (required)",
  "technologies": ["Array of strings (required)"],
  "link": "String (URL, optional)",
  "githubLink": "String (URL, optional)",
  "imageUrl": "String (URL, optional)",
  "startDate": "Date (optional)",
  "endDate": "Date (optional)",
  "featured": "Boolean (default: false)",
  "status": "String (enum: completed|in-progress|planned)"
}
```

**Example Request - Create Project:**
```bash
POST http://localhost:5000/api/projects
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "Portfolio Website",
  "description": "A full-stack portfolio with 3D effects",
  "technologies": ["React", "Node.js", "MongoDB"],
  "link": "https://myportfolio.com",
  "githubLink": "https://github.com/username/portfolio",
  "featured": true,
  "status": "completed"
}
```

#### **Certifications API**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/certifications` | Get all certifications | ❌ |
| `GET` | `/certifications/:id` | Get single certification | ❌ |
| `POST` | `/certifications` | Create new certification | ✅ |
| `PUT` | `/certifications/:id` | Update certification | ✅ |
| `DELETE` | `/certifications/:id` | Delete certification | ✅ |

**Certification Schema:**
```json
{
  "title": "String (required)",
  "issuingOrganization": "String (required)",
  "issueDate": "Date (required)",
  "expirationDate": "Date (optional)",
  "credentialId": "String (optional)",
  "credentialUrl": "String (URL, optional)",
  "description": "String (optional)",
  "skills": ["Array of strings (optional)"]
}
```

#### **Achievements API**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/achievements` | Get all achievements | ❌ |
| `GET` | `/achievements/:id` | Get single achievement | ❌ |
| `POST` | `/achievements` | Create new achievement | ✅ |
| `PUT` | `/achievements/:id` | Update achievement | ✅ |
| `DELETE` | `/achievements/:id` | Delete achievement | ✅ |

**Achievement Schema:**
```json
{
  "title": "String (required)",
  "description": "String (required)",
  "date": "Date (required)",
  "category": "String (enum: award|competition|publication|other)",
  "organization": "String (optional)",
  "link": "String (URL, optional)",
  "imageUrl": "String (URL, optional)"
}
```

### Pagination

All GET endpoints support pagination using query parameters:

```
GET /api/projects?page=1&limit=10
```

**Response Format:**
```json
{
  "success": true,
  "count": 25,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  },
  "data": [...]
}
```

### Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information (development only)"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## 🎯 Frontend Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Homepage showcasing latest projects, certifications, and achievements |
| `/projects` | Projects | Complete list of all projects with filtering |
| `/certifications` | Certifications | Display all certifications earned |
| `/achievements` | Achievements | Showcase of achievements and awards |

### Component Features

#### Home Page
- Latest 3 projects displayed in folder-style cards
- Latest certifications and achievements preview
- 3D card effects with glare hover
- Animated pixel snow background
- Smooth parallax scrolling effects

#### Projects Page
- Grid layout of all projects
- Interactive 3D card transformations
- Technology stack tags
- Links to live demos and GitHub repositories
- Filtering and sorting capabilities

#### Certifications Page
- Timeline-style certification display
- Organization logos and credential links
- Skill tags for each certification
- Issue and expiration dates

#### Achievements Page
- Award showcase with categories
- Organization information
- Date-sorted achievement timeline
- Visual badges and icons

---

## 💻 Development

### Backend Development

**Start development server with auto-reload:**
```bash
cd Backend
npm run dev
```

**Manual testing with Postman:**
1. Import `Backend/Postman_Collection.json`
2. Set `jwt_token` variable
3. Test all endpoints

**Database Management:**
```bash
# Connect to MongoDB shell
mongo

# Show databases
show dbs

# Use portfolio database
use portfolio

# Show collections
show collections

# Query projects
db.projects.find().pretty()

# Clear all data (careful!)
db.dropDatabase()
```

### Frontend Development

**Start Vite dev server:**
```bash
cd Frontend
npm run dev
```

**Hot Module Replacement (HMR):**
- Changes auto-reload in browser
- Component state preserved when possible

**Linting:**
```bash
npm run lint
```

**Component Development Tips:**
- All components use functional React with hooks
- Framer Motion for animations
- CSS modules for component-specific styles
- Global styles in `src/styles/`

### Code Style & Best Practices

**Backend:**
- Use MVC architecture pattern
- Async/await for asynchronous operations
- Comprehensive error handling with try-catch
- Validation for all inputs using Joi
- Mongoose schemas with proper indexing

**Frontend:**
- Functional components with hooks
- PropTypes for type checking (if needed)
- Semantic HTML
- Accessible UI components
- Performance optimization with React.memo where beneficial

---

## 🏗️ Production Build

### Backend Production

**Environment Setup:**
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://production-cluster...
JWT_SECRET=very-strong-random-secret
PORT=5000
```

**Start production server:**
```bash
npm start
```

**Process Management (PM2):**
```bash
npm install -g pm2
pm2 start app.js --name portfolio-api
pm2 save
pm2 startup
```

### Frontend Production

**Build for production:**
```bash
cd Frontend
npm run build
```

Creates optimized build in `Frontend/dist/`

**Preview production build:**
```bash
npm run preview
```

**Deploy to hosting:**

```bash
# Example: Deploy to Vercel
npm install -g vercel
vercel --prod

# Example: Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Environment Variables for Production:**
Set `VITE_API_URL` to your production backend URL in your hosting platform.

### Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Set strong JWT_SECRET
- [ ] Configure MongoDB Atlas
- [ ] Enable CORS for production domain
- [ ] Build frontend with production API URL
- [ ] Test all API endpoints
- [ ] Verify frontend routes work
- [ ] Check SSL/HTTPS configuration
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy for database

---

## 🧪 Testing

### Backend Testing

**Test API endpoints with Postman:**
1. Import collection: `Backend/Postman_Collection.json`
2. Set environment variables
3. Run collection tests

**Manual testing:**
```bash
# Test server is running
curl http://localhost:5000

# Test GET endpoint
curl http://localhost:5000/api/projects

# Test authenticated POST
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test","description":"Test project"}'
```

### Frontend Testing

**Manual testing checklist:**
- [ ] All routes load correctly
- [ ] Navigation works smoothly
- [ ] Animations perform well
- [ ] API data displays correctly
- [ ] Error states handled gracefully
- [ ] Responsive on mobile devices
- [ ] Cross-browser compatibility

**Browser DevTools:**
- Check console for errors
- Verify network requests
- Test performance metrics
- Validate accessibility

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Failed:**
```
✗ MongoDB Connection Error: MongoServerError: Authentication failed
```
**Solution:** Check MONGO_URI in `.env`, verify credentials, ensure MongoDB is running

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill process on port 5000 or use VS Code task "Kill Ports and Node"

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

**CORS Error in Frontend:**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Ensure backend CORS is configured and VITE_API_URL is correct

**JWT Token Invalid:**
```
401 Unauthorized: jwt malformed
```
**Solution:** Regenerate token using `node src/utils/tokenGenerator.js` and update your requests

**Frontend Not Loading:**
- Check if backend is running on port 5000
- Verify VITE_API_URL in Frontend/.env
- Check browser console for errors

**Build Errors:**
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`
- Check Node.js version: `node --version`

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

---

## 📝 License

This project is licensed under the ISC License.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [your-portfolio.com](https://your-portfolio.com)

---

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB team for the excellent database
- Framer Motion for smooth animations
- Three.js for 3D graphics capabilities
- Lucide for beautiful icons
- The open-source community

---

## 📸 Screenshots

> **Note:** Add screenshots of your portfolio application here to showcase the UI/UX

### Homepage
![Homepage](link-to-screenshot)

### Projects Page
![Projects](link-to-screenshot)

### Certifications
![Certifications](link-to-screenshot)

---

## 🔮 Future Enhancements

- [ ] Add blog functionality
- [ ] Implement contact form with email integration
- [ ] Add admin dashboard for content management
- [ ] Implement search functionality
- [ ] Add dark/light theme toggle
- [ ] Create resume download feature
- [ ] Add analytics integration
- [ ] Implement caching for better performance
- [ ] Add unit and integration tests
- [ ] Create Docker containers for deployment

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Email: your.email@example.com
- Visit the [Discussions](https://github.com/yourusername/portfolio/discussions) page

---

<div align="center">

**⭐ Star this repository if you find it helpful! ⭐**

Made with ❤️ and lots of ☕

</div>