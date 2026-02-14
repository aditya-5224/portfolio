require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import config and middlewares
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middlewares/errorHandler');

// Import routes
const projectRoutes = require('./src/routes/projectsRoutes');
const certificationRoutes = require('./src/routes/certificationsRoutes');
const achievementRoutes = require('./src/routes/achievementsRoutes');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/achievements', achievementRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects',
      certifications: '/api/certifications',
      achievements: '/api/achievements'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✓ Server is running on http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
