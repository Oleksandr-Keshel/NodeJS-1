const authorModel = require('../models/author.model');

async function create(author) {
    return authorModel.create(author);
}

async function find(searchString = '', page = 1, perPage = 20) {
    const filter = { 
        name: {$regex: `${searchString}`, $options: 'i' },
    }
    return {
        items: await authorModel.find(filter).skip((page - 1) * perPage).limit(Number(perPage)),
        count: await authorModel.countDocuments(filter),
    }
}

async function findById(id) {
    return authorModel.findById(id);
}

async function findByIdAndUpdate(id, update) {
    return authorModel.findByIdAndUpdate(id, update, { upsert: false, new: true });
}

async function findByIdAndDelete(id) {
    return authorModel.findByIdAndDelete(id);
};


module.exports = {
    create,
    find,
    findById,
    findByIdAndUpdate,
    findByIdAndDelete
};