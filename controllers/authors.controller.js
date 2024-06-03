const authorService = require('../services/authors.service');
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const deleteFileAsync = promisify(fs.unlink);

async function createAuthor(req, res, next){
    try{
        const newAuthor = await authorService.create(req.body);

        res.status(200).json({
            status: 200,
            data: newAuthor,
        });
    } catch(err){
        next(createError.InternalServerError(err.message));
    }
};

async function getAuthors(req, res, next) {
    try {
        queryName = req.query.name
        res.status(200).json({
            status: 200,
            data: await authorService.find(queryName),
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};

async function getAuthor(req, res, next) {
    try {
        const { authorId } = req.params;
        const author = await authorService.findById(authorId);

        if (!author) {
            return res.status(400).json({
                status: 400,
                message: 'Author was not found.',
            });
        }

        res.status(200).json({
            status: 200,
            data: author,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};


async function updateAuthor(req, res, next) {
    try {
        const { authorId } = req.params;
        const authorData = req.body;
        const updatedAuthor = await authorService.findByIdAndUpdate(authorId, authorData);

        if (!updatedAuthor) {
            return res.status(400).json({
                status: 400,
                message: 'Author was not found.',
            });
        }

        res.status(200).json({
            status: 200,
            data: updatedAuthor
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};


async function deleteAuthor(req, res, next
) {
    try {
        const { authorId } = req.params;
        await authorService.findByIdAndDelete(authorId);

        res.status(200).json({
            status: 200,
        });
    } catch (err) {
        next(createError.InternalServerError(err.message));
    }
};

async function updateAuthorProfilePicture(req, res, next) {
    try {
        const { authorId } = req.params;

        console.log(req.file);

        // delete previous picture
        const author = await authorService.findById(authorId);
        if (author.profilePicture) {
            const filePath = path.join(__dirname, '..', 'public', 'profilePictures', author.profilePicture);
            await deleteFileAsync(filePath);
        }

        // update
        authorService.findByIdAndUpdate(authorId, { profilePicture: req.file.filename });

        res.status(200).json({
            status: 200,
        });
    } catch(err) {
        next(createError.InternalServerError(err.message));
    }
};

async function uploadAuthors(req, res, next) {
    try {
        console.log(req.file);
        const jsonData = JSON.parse(req.file.buffer.toString());
        res.json(jsonData);
    } catch(err) {
        next(createError.InternalServerError(err.message));
    }
}

module.exports = {
    createAuthor,
    getAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor,
    updateAuthorProfilePicture,
    uploadAuthors
};