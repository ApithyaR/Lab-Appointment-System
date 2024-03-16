const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/').post(protect, authorize('patient', 'admin'), appointmentController.createAppointment);
router.route('/patient').get(protect, authorize('patient', 'admin'), appointmentController.getPatientAppointments);
router.route('/').get(protect, authorize('patient', 'admin', 'technician'), appointmentController.getAllAppointments);

// Other appointment-related routes (update, delete, etc.)

module.exports = router;