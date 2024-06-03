const Joi = require('joi');

const AuthorCreateSchema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(60)
        .required(),
    address: Joi.string()
        .min(3)
        .max(60)
        .required(),
    theme: Joi.string()
        .min(1)
        .max(60)
        .required(),
    title: Joi.string()
        .min(1)
        .max(60)
        .required(),
    article: Joi.string()
        .min(1)
        .required(),
    images: Joi.array().items(Joi.string())
});

const AuthorUpdateSchema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(60),
    address: Joi.string()
        .min(3)
        .max(60),
    theme: Joi.string()
        .min(1)
        .max(60),
    title: Joi.string()
        .min(1)
        .max(60),
    article: Joi.string()
        .min(1),
    images: Joi.array().items(Joi.string())
});

module.exports = {
    AuthorCreateSchema,
    AuthorUpdateSchema,
};