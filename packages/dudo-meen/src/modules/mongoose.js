// Connect to our database
// --------------------------------
const mongoose = require('mongoose');

module.exports = (app, config) => {
    const logger = app.logger('MONGOOSE');
    mongoose.set('useCreateIndex', true);

    config.mongoose.debug && mongoose.set('debug', (collection, method, query, doc) => {
        logger.debug('"%s" in "%s" \n%o', method, collection, {
            query,
            doc,
        });
    });

    mongoose.connect(process.env.MONGOOSE_URL || config.mongoose.url, config.mongoose.options);
};
