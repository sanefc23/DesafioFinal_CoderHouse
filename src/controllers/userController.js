const logger = require('../services/logger');

const userController = {
    verifySession: (req, res) => {
        res.send(req.session)
    },
    failedUser: (req, res) => {
        logger.error(message)
        res.send(message)
    },
    logout: (req, res) => {
        logger.info(`${req.session.passport} logged out.`);
        req.session.destroy();
        res.cookie("connect.sid", null, {
            maxAge: 1
        });
        res.cookie("userCart", null, {
            maxAge: 1
        });
        res.send('Logged out.')
    }
}

module.exports = userController