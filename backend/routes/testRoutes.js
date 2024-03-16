const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/').post(protect, authorize('admin'), testController.createTest);
router.route('/').get(protect, authorize('patient', 'technician', 'doctor', 'admin'), testController.getAllTests);

// Other test-related routes (update, delete, etc.)

module.exports = router;