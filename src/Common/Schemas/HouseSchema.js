const Joi = require('@hapi/joi');

const HouseSchema = new Joi.object({
    url: Joi.string(),
    name: Joi.string(),
    region: Joi.string(),
    coatOfArms: Joi.string(),
    words: Joi.string(),
    titles: Joi.array(),
    seats: Joi.array(),
    currentLord: Joi.string(),
    heir: Joi.string(),
    overlord: Joi.string(),
    founded: Joi.string(),
    founder: Joi.string(),
    diedOut: Joi.string(),
    ancestralWeapons: Joi.array(),
    cadetBranches: Joi.array(),
    swornMembers: Joi.array(),
}).label('House');

module.exports = HouseSchema;