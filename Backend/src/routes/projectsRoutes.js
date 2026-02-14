const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectsController');
// const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// Protected routes (require JWT token)
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
