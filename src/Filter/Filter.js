const FilterHelper = require('./FilterHelper');

class Filter {
    constructor(request, schema) {
        this.idInitiated = false;
        let boolFilterArray = [{ filter: 'hasTitles', field: 'titles' }, { filter: 'hasSeats', field: 'seats' }, { filter: 'hasAncestralWeapons', field: 'ancestralWeapons' }];
        let boolFilterString = [{ filter: 'isAlive', field: 'died', reverse: true }, { filter: 'hasDiedOut', field: 'diedOut', reverse: false }, { filter: 'hasWords', field: 'words', reverse: false }];
        let defaultFilter = { page: 1, pageSize: 10};
        let maxPageSize = 50;

        let userFilter = request.query;
        if (request.params.id) {
            userFilter.id = request.params.id;
        }

        /* let validationResult = schema.validate(userFilter);
        let validatedFilter = validationResult.value;
        if (
            validationResult.error
            && validationResult.error instanceof Error
            && 'ValidationError' === validationResult.error.name
        ) {
            if ('"pageSize" must be less than or equal to' === validationResult.error.message) {
                defaultFilter.pageSize = maxPageSize;
            }

            validatedFilter = defaultFilter;
        } */

        /* готовый к растаскиванию на атомарки объект */
        let totalFilter = defaultFilter;
        Object.assign(totalFilter, userFilter);

        let pageSize = totalFilter.pageSize;
        let page = --totalFilter.page * totalFilter.pageSize;
        
        delete totalFilter.pageSize;
        delete totalFilter.page;

        if (totalFilter.id && totalFilter.id) {
            this.query = {url: { $regex: new RegExp('/' + totalFilter.id + '$', 'gm') }};
            this.idInitiated = true;
        } else {
            // Були в строковые
            boolFilterString.forEach(element => {
                totalFilter = FilterHelper.booleanToStringFilter(totalFilter, element.filter, element.field, element.reverse);
            });

            // Були в массивы
            boolFilterArray.forEach(element => {
                totalFilter = FilterHelper.booleanToArrayFilter(totalFilter, element.filter, element.field);
            });

            // Даты
            totalFilter = FilterHelper.datesToFilter(
                totalFilter,
                totalFilter.fromReleaseDate,
                totalFilter.toReleaseDate,
                'released'
            );
            
            this.page = page;
            this.pageSize = pageSize;
            // строка к строке и всё остальное.
            this.query = totalFilter;
        }
    }
}

module.exports = Filter;