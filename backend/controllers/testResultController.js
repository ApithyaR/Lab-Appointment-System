const TestResult = require('../models/testResultModel');
const Appointment = require('../models/appointmentModel');
const path = require('path');
const sendEmail = require('../utils/emailUtils');

const fs = require('fs');
const jspdf = require('jspdf');
const handlebars = require('handlebars');
const PDFDocument = require('pdfkit');

// Record a test result
exports.recordTestResult = async (req, res) => {
    const { appointmentId, technicianId, result } = req.body;

    try {
        // Check if the appointment exists
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found',
            });
        }

        // Create a new test result
        const newTestResult = await TestResult.create({
            appointment: appointmentId,
            technician: technicianId,
            result,
        });

        // Update the appointment status to 'completed'
        appointment.status = 'completed';
        await appointment.save();

        // Populate the patient and test details
        const populatedAppointment = await Appointment.findById(appointmentId)
            .populate('patient', 'name email')
            .populate('test', 'name')
            .exec();

        const patient = populatedAppointment.patient;
        const test = populatedAppointment.test;

        const emailSubject = `Test Result for ${test.name}`;
        const emailBody = `Dear ${patient.name},\n\nHere is the result for the ${test.name} test:\n\n${result}`;


        // sendEmail(patient.email, emailSubject, emailBody);


        const templateData = {
            patient: {
                name: patient.name,
            },
            test: {
                name: test.name,
            },
            result: result
        };


        const templateSource = fs.readFileSync('/Users/uahmeat/Projects/Personal/lab-management-system/backend/templates/test-result.hbs', 'utf8');
        const template = handlebars.compile(templateSource);

        const html = template(templateData);

        // Create the PDF
        const pdfFileName = `test_result_${appointmentId}.html`;
        const pdfFilePath = '/Users/uahmeat/Projects/Personal/lab-management-system/backend/test-results/' + pdfFileName;

        await generatePdfFromHtml(html, pdfFilePath);

        fs.writeFile(pdfFilePath, html, 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: 'Failed to save HTML file',
                });
            }
        });

        res.status(201).json({
            success: true,
            message: 'Test result recorded successfully',
            data: newTestResult,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to record test result',
        });
    }
};

exports.serveHtmlTestResult = async (req, res) => {
    try {
        const { fileName } = req.params;
        const filePath = path.join(__dirname, '..', 'test-results', fileName);
        const htmlContent = fs.readFileSync(filePath, 'utf8');
        res.send(htmlContent);
    } catch (error) {
        console.error('Error serving HTML test result:', error);
        res.status(500).send('Internal Server Error');
    }
};



// Get test results for an appointment
exports.getTestResultsByAppointment = async (req, res) => {
    const appointmentId = req.params.appointmentId;

    try {
        const testResults = await TestResult.find({ appointment: appointmentId })
            .populate('technician', 'name email')
            .populate('appointment', 'patient doctor test');

        res.status(200).json({
            success: true,
            data: testResults,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch test results',
        });
    }
};


function generatePdfFromHtml(htmlContent, pdfFilePath) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(pdfFilePath);

        // Pipe PDF content to the write stream
        doc.pipe(stream);

        // Render HTML content
        doc.text(htmlContent);

        // End document
        doc.end();

        stream.on('finish', () => {
            resolve(pdfFilePath);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}
// Other test result-related controllers (update, delete, etc.)