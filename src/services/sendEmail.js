const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('./logger');

async function sendEmail(emailMessage) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: config.ETHEREAL_EMAIL,
            pass: config.ETHEREAL_PASSWORD
        }
    });
    try {
        const response = await transporter.sendMail(emailMessage, (err, info) => {
            if (err) {
                logger.error('Error occurred. ' + err.message);
                return process.exit(1);
            }
        });
        return response;
        next();
    } catch (err) {
        logger.error('ERROR', err);
        res.status(500).json(err);
    }
}

module.exports = sendEmail;