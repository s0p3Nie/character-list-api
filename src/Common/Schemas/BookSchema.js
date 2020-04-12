const Joi = require('@hapi/joi');

const BookSchema = new Joi.object({
    url: Joi.string(),
    name: Joi.string(),
    isbn: Joi.string(),
    authors: Joi.array(),
    numberOfPages: Joi.number().integer(),
    publiser: Joi.string(),
    country: Joi.string(),
    mediaType: Joi.string(),
    released: Joi.date(),
    characters: Joi.array(),
    povCharacters: Joi.array(),
}).label('Book');

module.exports = BookSchema;