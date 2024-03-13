const Appointment = require('../models/appointmentModel');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const Test = require('../models/testModel');
const Timeslot = require('../models/timeslotModel');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    const { patientId, doctorId, testId, timeslotId } = req.body;

    try {
        // Check if patient, doctor, and test exist
        const patient = await Patient.findById(patientId);
        const doctor = await Doctor.findById(doctorId);
        const test = await Test.findById(testId);
        const timeslot = await Timeslot.findById(timeslotId);

        if (!patient || !doctor || !test) {
            return res.status(404).json({
                success: false,
                message: 'Patient, doctor, or test not found',
            });
        }

        // Create a new appointment
        const newAppointment = await Appointment.create({
            patient: patientId,
            doctor: doctorId,
            test: testId,
            timeslot: timeslotId,
        });

        res.status(201).json({
            success: true,
            message: 'Appointment created successfully',
            data: newAppointment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to create appointment',
        });
    }
};

// Get all appointments for a patient
exports.getPatientAppointments = async (req, res) => {
    const patientId = req.user._id;

    try {
        const appointments = await Appointment.find({ patient: patientId })
            .populate('patient', 'name email')
            .populate('doctor', 'name email')
            .populate('test', 'name description price');

        res.status(200).json({
            success: true,
            data: appointments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch appointments',
        });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointment = await Appointment.find();

        res.status(200).json({
            success: true,
            data: appointment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch doctors',
        });
    }
};


// Other appointment-related controllers (update, delete, etc.)