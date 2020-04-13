const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    url: String,
    name: String,
    gender: String,
    culture: String,
    born: String,
    died: String,
    titles: [String],
    aliases: [String],
    father: String,
    mother: String,
    spouse: String,
    allegiances: [String],
    books: [String],
    povBooks: [String],
    tvSeries: [String],
    playedBy: [String],
});

module.exports = CharacterSchema;