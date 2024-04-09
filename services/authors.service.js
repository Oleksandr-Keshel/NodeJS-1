const data = require('../data/authors');

function _generateId() {
    const crypto = require("crypto");
    return crypto.randomBytes(16).toString("hex");
}

async function create(author) {
    const newAuthor = { id: _generateId(), ...author };
    data.authors.push(newAuthor);

    return newAuthor;
}

async function find({ searchString = '', page = 1, perPage = Number.MAX_SAFE_INTEGER }) {
    searchString = searchString?.toLowerCase();
    const searchResult = data.authors.filter(a => a.name?.toLowerCase().includes(searchString));

    return {
        items: searchResult.slice((page - 1)*perPage, page * perPage),
        count: searchResult.length,
    }
}

async function findById(id) {
    return data.authors.find(a => a.id == id);
}

async function update(authorId, authorData) {
    const index = data.authors.findIndex(a => a.id === authorId);

    if (index === -1) return;

    const updatedAuthor = { ...data.authors[index], ...authorData, id: authorId };

    data.authors[index] = updatedAuthor;
    return updatedAuthor;
};

async function remove(id) {
    data.authors = data.authors.filter(a => a.id != id);
};


module.exports = {
    create,
    find,
    findById,
    update,
    remove
};