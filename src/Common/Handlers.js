const FilterSchemaCharacter = require('../Filter/Schemas/FilterSchemaCharacter');
const FilterSchemaBook = require('../Filter/Schemas/FilterSchemaBook');
const FilterSchemaHouse = require('../Filter/Schemas/FilterSchemaHouse');
const Filter = require('../Filter/Filter');
const responseInfo = { data: [], pages: { first: null, last: null, prev: null, next: null }, noError: true };
const MongoDB = require('../Mongo/MongoDB');
const MongoClient = new MongoDB();

function buildResponse(request, h, query) {
    let pagesHeader = '';
    for (let element in query.pages) {
        if (element) {
            let hrefHaveSlash = /\/[0-9]*$/gm.test(request.url.href);
            let href = hrefHaveSlash
                ? request.url.href.replace(/\/[0-9]*$/gm, '/' + query.pages[element])
                : (request.url.href + '/' + query.pages[element]);
            
            pagesHeader +=
            (pagesHeader.length ? ', ' : '') 
            + '<' + href + '>; '
            + 'rel="' + element + '"';
        }
    }

    let response = h.response();
    if (query.noError) {
        response = h.response('Could not find any resource that matches the request, try again!');
        response.statusCode = 404;
    } else {
        response = h.response(query.data).header('Link', pagesHeader);
    }
    
    return response;
}

async function find(filter) {
    await MongoClient.createConnection();
    let mongoModel = MongoClient.getModel().model;
    let mainResult = await mongoModel.find(filter.query, '-__v -_id', { skip: filter.page, limit: filter.pageSize });
    console.log(mainResult);
    if (filter.idInitiated) {
        responseInfo.noError = false;
    } else {
        let currentPage = filter.page/filter.pageSize+1
        let count = await mongoModel.countDocuments(filter.query);
        responseInfo.pages.last = Math.ceil(count / filter.pageSize) || 1;
        responseInfo.pages.prev = 1 < currentPage ? (currentPage - 1) : null;
        responseInfo.pages.next = count > currentPage ? (currentPage + 1) : null;
        responseInfo.pages.first = 1;
    }

    responseInfo.data = mainResult;

    return responseInfo;
}

const books = async (request, h) => {
    MongoClient.setCollection('books');
    let filter = new Filter(request, FilterSchemaBook);
    let query = await find(filter);
    
    return buildResponse(request, h, query);
}

const characters = async (request, h) => {
    MongoClient.setCollection('characters');
    let filter = new Filter(request, FilterSchemaCharacter);
    let query = await find(filter);
    
    return buildResponse(request, h, query);
}

const houses = async (request, h) => {
    MongoClient.setCollection('houses');
    let filter = new Filter(request, FilterSchemaHouse);
    let query = await find(filter);
    
    return buildResponse(request, h, query);
}

module.exports = { books, characters, houses }