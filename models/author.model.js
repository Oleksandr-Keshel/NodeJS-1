const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
        type: String,
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    theme: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    article: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: [String],
    }
},  {
    timestamps: true
});

module.exports = mongoose.model('author', authorSchema);
