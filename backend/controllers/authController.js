const Patient = require('../models/patientModel');
const Technician = require('../models/technicianModel');
const Doctor = require('../models/doctorModel');
const Admin = require('../models/adminModel');
const sendEmail = require('../utils/emailUtils');
const generateToken = require('../utils/jwtUtils');

// User registration controllers
exports.registerPatient = async (req, res) => {
    const { name, email, password } = req.body;

    const newPatient = await Patient.create({
        name,
        email,
        password,
    });

    await sendEmail(email, 'Welcome to our healthcare platform!', `Dear ${name},\n\nThank you for registering with our healthcare platform. We are excited to have you on board and look forward to providing you with the best possible service.\n\nIf you have any questions or concerns, please don't hesitate to reach out to us.\n\nBest regards,\nThe Healthcare Team`);

    res.status(201).json({
        success: true,
        message: 'Patient registered successfully',
        data: newPatient,
    });
};

exports.registerTechnician = async (req, res) => {
    const { name, email, password, specialization, certifications, employmentStartDate } = req.body;

    const newTechnician = await Technician.create({
        name,
        email,
        password,
        specialization,
        certifications,
        employmentStartDate,
    });

    res.status(201).json({
        success: true,
        message: 'Technician registered successfully',
        data: newTechnician,
    });
};

exports.registerDoctor = async (req, res) => {
    const { name, email, password, specialization, experience, qualifications } = req.body;

    const newDoctor = await Doctor.create({
        name,
        email,
        password,
        specialization,
        experience,
        qualifications,
    });

    res.status(201).json({
        success: true,
        message: 'Doctor registered successfully',
        data: newDoctor,
    });
};

exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    const newAdmin = await Admin.create({
        name,
        email,
        password,
    });

    res.status(201).json({
        success: true,
        message: 'Admin registered successfully',
        data: newAdmin,
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email in all user type collections
    const user =
        (await Patient.findOne({ email }).select('+password')) ||
        (await Technician.findOne({ email }).select('+password')) ||
        (await Doctor.findOne({ email }).select('+password')) ||
        (await Admin.findOne({ email }).select('+password'));

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }

    // Match the password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }

    // Generate and send the JWT token
    const token = generateToken(user);

    res.status(200).json({
        name: user.name,
        email: user.email,
        success: true,
        message: 'Login successful',
        token,
        role: user.role,
    });
};