const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/certificationsController');
// const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/', certificationController.getAllCertifications);
router.get('/:id', certificationController.getCertificationById);

// Protected routes (require JWT token)
router.post('/', certificationController.createCertification);
router.put('/:id', certificationController.updateCertification);
router.delete('/:id', certificationController.deleteCertification);

module.exports = router;
