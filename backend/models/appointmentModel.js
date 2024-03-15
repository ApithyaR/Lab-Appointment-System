const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true,
    },
    // appointmentDate: {
    //     type: Date,
    //     required: true,
    // },
    timeslot: {  // Add the reference to a Timeslot
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Timeslot',  
        required: false, 
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;