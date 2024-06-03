const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMidlleware = require('../middlewares/auth.middleware');

router.post('/signin',authMidlleware.signinDataValidation, authController.signin)

router.delete('/signin',authController.signout)


module.exports = router;