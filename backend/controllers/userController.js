const Appointment = require('../models/appointmentModel');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const Test = require('../models/testModel');
const Technician = require('../models/technicianModel')

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();

        res.status(200).json({
            success: true,
            data: doctors,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch doctors',
        });
    }
};


exports.getAllPatients= async (req, res) => {
    try {
        const patients = await Patient.find();

        res.status(200).json({
            success: true,
            data: patients,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch patients',
        });
    }
};

exports.getAllTechnicians= async (req, res) => {
    try {
        const technicians = await Technician.find();

        res.status(200).json({
            success: true,
            data: technicians,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch technicians',
        });
    }
};

