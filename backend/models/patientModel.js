const mongoose = require('mongoose');
const User = require('./userModel');

const patientSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'patient',
    },
    medicalHistory: {
        type: String,
    },
    insuranceDetails: {
        providerName: String,
        policyNumber: String,
    },
});

patientSchema.add(User.schema);

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;