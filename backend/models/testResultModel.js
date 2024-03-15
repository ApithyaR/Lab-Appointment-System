const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true,
    },
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technician',
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const TestResult = mongoose.model('TestResult', testResultSchema);

module.exports = TestResult;