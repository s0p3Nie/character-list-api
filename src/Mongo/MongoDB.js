const Character = require('./Schemas/CharacterSchema');
const Book = require('./Schemas/BookSchema');
const House = require('./Schemas/HouseSchema');
const Config = require('../Resources/config').mongo;
const Mongoose = require('mongoose');

/* Не хотел тащить всюду монгуз. даёшь абстракции */
class MongoDB {
    static COLLECTION_CHARACTERS = 'characters';
    static COLLECTION_BOOKS = 'books';
    static COLLECTION_HOUSES = 'houses';
    static COLLECTIONS_LIST = [MongoDB.COLLECTION_CHARACTERS, MongoDB.COLLECTION_BOOKS, MongoDB.COLLECTION_HOUSES];

    constructor() {
        Mongoose.connect(Config.url + Config.db, { useNewUrlParser: true, useUnifiedTopology: true });
        this.collection = null;
    }

    async disconnect() {
        await Mongoose.disconnect();
    }

    setCollection(collection) {
        this.collection = collection;
    }

    getModel() {
        switch (this.collection) {
            case MongoDB.COLLECTION_CHARACTERS:
                return Character;

            case MongoDB.COLLECTION_BOOKS:
                return Book;

            case MongoDB.COLLECTION_HOUSES:
                return House;

            default:
                return null;
        }
    }
}

module.exports = MongoDB;