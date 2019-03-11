// Connect to our database
// --------------------------------
const config = require('../utils/config');
const mongooseLogger = require('../utils/logger')('MONGOOSE');
const mongoose = require('mongoose');
module.exports = () => {
    mongoose.set('useCreateIndex', true);
    mongoose.set('debug', (collection, method, query, doc) => {
        mongooseLogger.debug('"%s" in "%s" \n%o', method, collection, {
            query,
            doc
        });
    });
    mongoose.connect(config.mongodb.url, config.mongodb.options);
    mongoose.Promise = require('q').Promise;
};
