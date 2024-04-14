
const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const authorService = require('../services/authors.service');

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

module.exports = {
    authorByIdValidation,
};