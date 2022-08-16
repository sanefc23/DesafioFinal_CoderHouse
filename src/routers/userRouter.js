const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/userController");
const path = require('path');
const multer = require('multer');
const sendRegisterEmail = require('../middlewares/sendRegisterEmail');
const passport = require("../middlewares/passportMiddleware")


// Multer implementation
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/userAvatars/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

userRouter.post('/login', passport.authenticate('login', {
    failureRedirect: '/api/user/failedUser',
    successRedirect: '/api/user/session',
    failureFlash: true
}));
userRouter.post('/register', upload.any('file'), sendRegisterEmail, passport.authenticate('register', {
    failureRedirect: '/api/user/failedUser',
    successRedirect: '/api/user/session',
    failureFlash: true
}));
userRouter.get('/session', userController.verifySession);
userRouter.get('/failedUser', userController.failedUser);
userRouter.post('/logout', userController.logout);

module.exports = userRouter;