const Joi = require('@hapi/joi');

const FilterSchemaBook = Joi.object({
    name: Joi.string(),

    fromReleaseDate: Joi.date().iso(),
    toReleaseDate: Joi.date().iso(),

    page: Joi.number().integer().greater(0),
    pageSize: Joi.number().integer().greater(0).max(50),
});

module.exports = FilterSchemaBook;