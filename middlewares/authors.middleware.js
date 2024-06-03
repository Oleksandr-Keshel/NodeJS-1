const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const authorService = require('../services/authors.service');
const authorModel = require('../models/author.model');
const {AuthorCreateSchema, AuthorUpdateSchema} = require('../joi_validation_schemas/authors.shemas')
const multer = require('multer');

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

const authorUploadProfilePicture = multer({
    storage: multer.diskStorage({
      destination: 'public/profilePictures/',
    }),
    limits: { fileSize: 100 * 1024 /* bytes */ },
    fileFilter: (req, file, callback) => {
      if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.mimetype)) {
        return callback(createError.BadRequest("This type of file is not allowed"));
      }

      callback(null, true);
    }
}).single('file');

const authorsUpload = multer().single('file');

module.exports = {
    authorByIdValidation,
    authorCreationDataValidation,
    authorUpdateDataValidation,
    authorsUpload,
    authorUploadProfilePicture
};