const express = require('express');
const router = express.Router();
const timeslotController = require('../controllers/timeslotController')
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/').post(protect, authorize('admin'), timeslotController.createTimeslot);
router.route('/:testId').get(protect, authorize('patient', 'technician', 'doctor', 'admin'), timeslotController.getTimeslotsForTest);

module.exports = router;