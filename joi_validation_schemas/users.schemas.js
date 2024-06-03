const Joi = require('joi');

const UserCreateSchema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(60)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required()
        .min(6)
        .max(12),
});

const UserUpdateSchema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(60),
    email: Joi.string()
        .email()
});

module.exports = {
    UserCreateSchema,
    UserUpdateSchema,
};