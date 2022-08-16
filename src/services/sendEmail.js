const nodemailer = require('nodemailer');
const config = require('../config/config');

async function sendEmail(emailMessage) {
    const transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        host: 'smtppro.zoho.in',
        port: 587,
        auth: {
            user: config.ETHEREAL_EMAIL,
            pass: config.ETHEREAL_PASSWORD
        }
    });

    try {
        const response = await transporter.sendMail(emailMessage, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
        });
        return response;
        next();

    } catch (err) {
        console.log('ERROR', err);
        res.status(500).json(err);
    }
}

module.exports = sendEmail;