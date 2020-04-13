const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    url: String,
    name: String,
    isbn: String,
    authors: [String],
    numberOfPages: Number,
    publiser: String,
    country: String,
    mediaType: String,
    released: Date,
    characters: [String],
    povCharacters: [String],
});

module.exports = mongoose.model('Book', BookSchema);