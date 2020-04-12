const Joi = require('@hapi/joi');

const CharacterSchema = new Joi.object({
    url: Joi.string(),
    name: Joi.string(),
    gender: Joi.string(),
    culture: Joi.string(),
    born: Joi.string(),
    died: Joi.string(),
    titles: Joi.array(),
    aliases: Joi.array(),
    father: Joi.string(),
    mother: Joi.string(),
    spouse: Joi.string(),
    allegiances: Joi.array(),
    books: Joi.array(),
    povBooks: Joi.array(),
    tvSeries: Joi.array(),
    playedBy: Joi.array(),
}).label('Character');

module.exports = CharacterSchema