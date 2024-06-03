const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const authorService = require('../services/authors.service');
const {AuthorCreateSchema, AuthorUpdateSchema} = require('../joi_validation_schemas/authors.schemas')

async function authorByIdValidation(req, res, next) {
    try {
        const { authorId } = req.params;

        if (!ObjectId.isValid(authorId)) {
            throw createError.BadRequest("Author id is not valid");
        }

        const author = await authorService.findById(authorId);

        if (!author) {
            throw createError.NotFound("Author with such id not found");
        }

        next();
    } catch(err) {
        next(err);
    }
};

const authorCreationDataValidation = async (req, res, next) => {
    try {
        const { error } = AuthorCreateSchema.validate(req.body);

        if (error) {
            throw createError.BadRequest(error.details[0].message);
        }

        const author = await authorService.findOne({
            $or: [
                { name: req.body.name },
            ]
        });

        if (author) {
            throw createError.BadRequest("Author with such name already exist");
        }

        next();
    } catch (err) {
        next(err);
    }
};

const authorUpdateDataValidation = async (req, res, next) => {
    try {
        const { error } = AuthorUpdateSchema.validate(req.body);

        if (error) {
            throw createError.BadRequest(error.details[0].message);
        }

        if (req.body.name) {
            const orExpressions = [];

            if (req.body.name) {
                orExpressions.push({ name: req.body.name });
            }

            const author = await authorService.findOne({
                _id: {
                    $ne: req.params.authorId
                },
                $or: orExpressions
            });
            console.log(author);
            if (author) {
                throw createError.BadRequest("Author with such name already exist");
            }
        }

        next();
    } catch (err) {
        next(err);
    }
};


module.exports = {
    authorByIdValidation,
    authorCreationDataValidation,
    authorUpdateDataValidation
};