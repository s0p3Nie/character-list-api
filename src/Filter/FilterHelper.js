const booleanToArrayFilter = (totalFilter, filterField, dbField) => {
    if (totalFilter[filterField] && true === totalFilter[filterField]) {
        totalFilter[dbField] = { $not: { $size: 0 }};
        delete totalFilter[filterField];

        return totalFilter;
    } else if (totalFilter[filterField] && false === totalFilter[filterField]) {
        totalFilter[dbField] = { $size: 0 };
        delete totalFilter[filterField];

        return totalFilter;
    }

    return totalFilter;
};

const booleanToStringFilter = (totalFilter, filterField, dbField, reverse = false) => {
    if (totalFilter[filterField] && !reverse === totalFilter[filterField]) {
        totalFilter[dbField] = '';
        delete totalFilter[filterField];

        return totalFilter;
    } else if (totalFilter[filterField] && reverse === totalFilter[filterField]) {
        totalFilter[dbField] = { $ne: '' };
        delete totalFilter[filterField];

        return totalFilter;
    }

    return totalFilter;
};

const datesToFilter = (totalFilter, dateFrom, dateTo, dbField) => {
    if (dateFrom && dateTo) {
        totalFilter.$and = [{ [dbField]: { $gte: dateFrom }}, { [dbField]: { $lte: dateTo }}];
    } else if (dateFrom) {
        totalFilter[released] = { $gte: dateFrom };
    } else if (dateTo) {
        totalFilter[released] = { $lte: dateTo };
    }

    delete totalFilter.fromReleaseDate;
    delete totalFilter.toReleaseDate;

    return totalFilter;
};

module.exports = { booleanToArrayFilter, booleanToStringFilter, datesToFilter };