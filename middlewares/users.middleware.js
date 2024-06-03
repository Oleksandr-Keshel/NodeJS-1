const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const userService = require('../services/users.service');
const { UserCreateSchema, UserUpdateSchema } = require('../joi_validation_schemas/users.schemas');

async function userByIdValidation(req, res, next) {
    try {
        const { userId } = req.params;

        if (!ObjectId.isValid(userId)) {
            throw createError.BadRequest("User id is not valid");
        }

        const user = await userService.findById(userId);

        if (!user) {
            throw createError.NotFound("User with such id not found");
        }

        next();
    } catch(err) {
        next(err);
    }
};

const userCreationDataValidation = async (req, res, next) => {
    try {
        const { error } = UserCreateSchema.validate(req.body);

        if (error) {
            throw createError.BadRequest(error.details[0].message);
        }

        const user = await userService.findOne({
            $or: [
                { name: req.body.name },
                { email: req.body.email },
            ]
        });

        if (user) {
            throw createError.BadRequest("User with such name or email already exists");
        }

        next();
    } catch (err) {
        next(err);
    }
};

const userUpdateDataValidation = async (req, res, next) => {
    try {
        const { error } = UserUpdateSchema.validate(req.body);

        if (error) {
            throw createError.BadRequest(error.details[0].message);
        }

        if (req.body.name || req.body.email) {
            const orExpressions = [];

            if (req.body.name) {
                orExpressions.push({ name: req.body.name });
            }

            if (req.body.email) {
                orExpressions.push({ email: req.body.email });
            }

            const user = await userService.findOne({
                _id: {
                    $ne: req.params.userId
                },
                $or: orExpressions
            });
    
            if (user) {
                throw createError.BadRequest("User with such name or email already exists");
            }
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    userByIdValidation,
    userCreationDataValidation,
    userUpdateDataValidation,
};