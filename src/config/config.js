const denv = require('dotenv');

denv.config();

module.exports = {
    MODE: process.env.MODE,
    PORT: process.env.PORT,
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    EXPIRATION: parseInt(process.env.EXPIRATION),
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL,
    ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD,
    ETHEREAL_NAME: process.env.ETHEREAL_NAME
};