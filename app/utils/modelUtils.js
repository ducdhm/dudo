const config = require('./config');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('./logger')('utils/modelUtils');

const makeQueryBuilder = (model, options = {}, findOne) => {
    logger.debug('makeQueryBuilder options=%o', options);

    let {
        query,
        populate,
        sort,
        page,
        select
    } = options;
    let queryBuilder = model[findOne ? 'findOne' : 'find'](query);

    populate && queryBuilder.populate(populate);
    sort && queryBuilder.sort(sort);
    select && queryBuilder.select(select);
    page && queryBuilder.skip((config.itemPerPage * page) - config.itemPerPage).limit(config.itemPerPage);

    return queryBuilder;
};

const saveRecord = (record, payload, populateFn) => {
    logger.debug('saveRecord record=%o payload=%o populateFn=%o', record, payload, populateFn);

    if (populateFn) {
        record = populateFn(record, payload);
    } else {
        for (let key in payload) {
            if (payload.hasOwnProperty(key)) {
                record[key] = payload[key];
            }
        }
    }

    return record.save();
};

module.exports = (model) => {
    return {
        constructor: model,
        create: (payload) => new model(payload),
        count: (query) => model.countDocuments(query).exec(),
        totalPage: (query) => model.countDocuments(query).exec().then(total => Math.ceil(total / config.itemPerPage)),
        find: (options) => makeQueryBuilder(model, options).exec(),
        findById: (id) => model.findById(id).exec(),
        findOne: (options) => makeQueryBuilder(model, options, true).exec(),
        delete: (record) => record.delete(),
        deleteById: (id) => model.deleteOne({_id: id}),
        save: (record, payload, populateFn) => saveRecord(record, payload, populateFn),
        isValidId: (id) => ObjectId.isValid(id)
    }
};
