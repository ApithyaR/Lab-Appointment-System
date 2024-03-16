const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration routes
router.post('/register/patient', authController.registerPatient);
router.post('/register/technician', authController.registerTechnician);
router.post('/register/doctor', authController.registerDoctor);
router.post('/register/admin', authController.registerAdmin);

// User login route
router.post('/login', authController.login);

module.exports = router;