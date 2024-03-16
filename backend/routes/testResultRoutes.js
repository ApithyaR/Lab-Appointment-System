const express = require('express');
const router = express.Router();
const testResultController = require('../controllers/testResultController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/').post(protect, authorize('technician'), testResultController.recordTestResult);
router.route('/:appointmentId').get(protect, authorize('patient', 'technician', 'doctor'), testResultController.getTestResultsByAppointment);

router.route('/html/:fileName').get(protect, authorize('patient', 'technician', 'doctor'), testResultController.serveHtmlTestResult);
// Other test result-related routes (update, delete, etc.)

module.exports = router;