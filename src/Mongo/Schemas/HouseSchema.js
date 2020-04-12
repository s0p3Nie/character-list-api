const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    url: String,
    name: String,
    region: String,
    coatOfArms: String,
    words: String,
    titles: [String],
    seats: [String],
    currentLord: String,
    heir: String,
    overlord: String,
    founded: String,
    founder: String,
    diedOut: String,
    ancestralWeapons: [String],
    cadetBranches: [String],
    swornMembers: [String],
});

module.exports = { model: mongoose.model('House', HouseSchema), schema: HouseSchema };