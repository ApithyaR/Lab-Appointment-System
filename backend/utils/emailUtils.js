const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const sgTransport = require('@sendgrid/mail');

const sendEmail = async (to, subject, text) => {
    try {
        // Set the SendGrid API key
        sgTransport.setApiKey('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');

        const transporter = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: "apikey",
                pass: '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',
            },
        });

        await transporter.sendMail({
            from: 'atheeque98@gmail.com',
            to,
            subject,
            text,
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;