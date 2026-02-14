const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/', achievementController.getAllAchievements);
router.get('/:id', achievementController.getAchievementById);

// Protected routes (require JWT token)
router.post('/', authMiddleware, achievementController.createAchievement);
router.put('/:id', authMiddleware, achievementController.updateAchievement);
router.delete('/:id', authMiddleware, achievementController.deleteAchievement);

module.exports = router;
