const authorService = require('../services/authors.service');

async function createAuthor(req, res){
    try{
        const newAuthor = await authorService.create(req.body);

        res.status(200).json({
            status: 200,
            data: newAuthor,
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function getAuthors(req, res) {
    try {
        res.status(200).json({
            status: 200,
            data: await authorService.find(req.query),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

async function getAuthor(req, res) {
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
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};


async function updateAuthor(req, res) {
    try {
        const { authorId } = req.params;
        const authorData = req.body;
        const updatedAuthor = await authorService.update(authorId, authorData);

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
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};


async function deleteAuthor(req, res) {
    try {
        const { authorId } = req.params;
        await authorService.remove(authorId);

        res.status(200).json({
            status: 200,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err,
        });
    }
};

module.exports = {
    createAuthor,
    getAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor
};