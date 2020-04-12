const Joi = require('@hapi/joi');

const FilterSchemaCharacter = Joi.object({
    name: Joi.string(),
    gender: Joi.string(),
    culture: Joi.string(),
    born: Joi.string(),
    died: Joi.string(),
    isAlive: Joi.boolean(),

    page: Joi.number().integer().greater(0),
    pageSize: Joi.number().integer().greater(0).max(50),
});

module.exports = FilterSchemaCharacter;