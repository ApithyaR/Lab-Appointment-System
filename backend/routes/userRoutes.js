const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');


router.route('/getDoctors').get(protect, authorize('admin', 'patient'), userController.getAllDoctors);
router.route('/getPatients').get(protect, authorize('admin'), userController.getAllPatients);
router.route('/getTechnicians').get(protect, authorize('admin'), userController.getAllTechnicians);
// Other test-related routes (update, delete, etc.)

module.exports = router;