const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/certificationsController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/', certificationController.getAllCertifications);
router.get('/:id', certificationController.getCertificationById);

// Protected routes (require JWT token)
router.post('/', authMiddleware, certificationController.createCertification);
router.put('/:id', authMiddleware, certificationController.updateCertification);
router.delete('/:id', authMiddleware, certificationController.deleteCertification);

module.exports = router;
