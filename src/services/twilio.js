const config = require('../config/config');
const twilio = require('twilio');

async function sendWPMessage(cellphoneNumber, message) {
    const twilioWP = twilio(config.TWILIO_ACCOUNT_ID, config.TWILIO_AUTH_TOKEN);
    const params = {
        body: message,
        from: `whatsapp:${config.TWILIO_NUMBER}`,
        to: `whatsapp:${cellphoneNumber}`,
    };

    const response = await twilioWP.messages.create(params);
    return response;
}


module.exports = sendWPMessage;