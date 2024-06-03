require('dotenv').config();
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const signAccessToken = async (user) => {
    return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 24 * 60 * 60 });
};

const verifyAccessToken = async (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        let message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
        if (err.name == 'JsonWebTokenError') {
            message = 'Unauthorized';
        } else if (err.name == 'TokenExpiredError') {
            message = 'Session ended. Access token expired'
        }

        throw createError.Unauthorized(message);
    }
};

module.exports = {
    signAccessToken,
    verifyAccessToken,
};
