const mongoose = require('mongoose');
const User = require('./userModel');

const doctorSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'doctor',
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    qualifications: {
        type: [String],
        required: true,
    },
});

doctorSchema.add(User.schema);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;