'use strict';

const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Nes = require('@hapi/nes');
const Hapi = require('@hapi/hapi');
const Handler = require('./Common/Handlers');
const Joi = require('@hapi/joi');
const FilterSchemaCharacter = require('./Filter/Schemas/FilterSchemaCharacter');
const FilterSchemaBook = require('./Filter/Schemas/FilterSchemaBook');
const FilterSchemaHouse = require('./Filter/Schemas/FilterSchemaHouse');
const Config = require('./Resources/config').server;

const Character = require('./Common/Schemas/CharacterSchema');
const Book = require('./Common/Schemas/BookSchema');
const House = require('./Common/Schemas/HouseSchema');

const init = async () => {
    const server = Hapi.Server(Config);

    const swaggerOptions = {
        info: {
                title: 'Ice&Fire API Documentation',
                version: '1.0',
            },
        };

    await server.register([
        Nes,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.route([
        {
            method: 'GET',
            path: '/api/books/{id?}',
            options: {
                handler: Handler.books,
                description: 'Books list fetching',
                notes: 'Returns a fetched list of Ice&Fire books',
                tags: ['api'],
                validate: {
                    params: Joi.object({ id: Joi.number().integer().greater(0) }),
                    query: FilterSchemaBook,
                },
                //response: { schema: Book } убивает сваггер
            }
        },
        {
            method: 'GET',
            path: '/api/characters/{id?}',
            options: {
                handler: Handler.characters,
                description: 'Characters list fetching',
                notes: 'Returns fetched list of Ice&Fire characters',
                tags: ['api'],
                validate: {
                    params: Joi.object({ id: Joi.number().integer().greater(0) }),
                    query: FilterSchemaCharacter,
                },
                // response: { schema: Character } убивает сваггер
            }
        },
        {
            method: 'GET',
            path: '/api/houses/{id?}',
            options: {
                handler: Handler.houses,
                description: 'Houses list fetching',
                notes: 'Returns fetched list of Ice&Fire houses',
                tags: ['api'],
                validate: {
                    params: Joi.object({ id: Joi.number().integer().greater(0) }),
                    query: FilterSchemaHouse,
                },
                // response: { schema: House } убивает сваггер
            }
        }
    ]);

    await server.start();

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
