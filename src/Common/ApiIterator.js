const Fetch = require('node-fetch');

class ApiIterator {
    static baseOutUrl = 'https://anapioficeandfire.com/api/';

    async iterate() {
        if (!this.collection) {
            return [];
        }

        let url = ApiIterator.baseOutUrl + this.collection + '?page=' + this.i + '&pageSize=50';
        console.log('iterating: ' + url);
        let response = await Fetch(url);
        let object = await response.json();

        if (!object || !object.length) {
            console.log('NO MORE DATA. Total iterates: ' + this.i);
            this.haveMore = false;
            return [];
        }

        ++this.i;
        
        return object;
    }

    isHaveMore() {
        return this.haveMore;
    }

    init(collection) {
        this.collection = collection;
        this.haveMore = true;
        this.i = 1;
    }
}

module.exports = ApiIterator;