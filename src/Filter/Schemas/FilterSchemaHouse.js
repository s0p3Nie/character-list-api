const Joi = require('@hapi/joi');

const FilterSchemaHouse = Joi.object({
    name: Joi.string(),
    region: Joi.string(),
    words: Joi.string(),
    hasWords: Joi.string(),
    hasTitles: Joi.string(),
    hasSeats: Joi.string(),
    hasDiedOut: Joi.string(),
    hasAncestralWeapons: Joi.string(),
    page: Joi.number().integer().greater(0),
    pageSize: Joi.number().integer().greater(0).max(50),
});

module.exports = FilterSchemaHouse;