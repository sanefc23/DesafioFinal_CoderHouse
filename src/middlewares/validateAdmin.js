const admin = true;

const validateAdmin = (req, res, next) => {
    if (admin) next();
    else res.status(401).json({
        msg: 'No autorizado'
    });
};

module.exports = validateAdmin;