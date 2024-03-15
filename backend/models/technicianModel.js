const mongoose = require('mongoose');
const User = require('./userModel');

const technicianSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'technician',
    },
    specialization: {
        type: String,
        required: true,
    },
    certifications: {
        type: [String],
        required: true,
    },
    employmentStartDate: {
        type: Date,
        required: true,
    },
});

technicianSchema.add(User.schema);

const Technician = mongoose.model('Technician', technicianSchema);

module.exports = Technician;