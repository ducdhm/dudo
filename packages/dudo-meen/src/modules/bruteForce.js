const RateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const { newError } = require('@dudojs/utils');

module.exports = (app) => {
    const { config, LOCALE } = app;

    const limiter = new RateLimit({
        store: config.bruteForce.mongoStore ? new MongoStore({
            uri: config.mongoose.url,
            collectionName: config.bruteForce.collectionName,
            expireTimeMs: config.bruteForce.limitTime,
        }) : null,
        max: config.bruteForce.maxRequest,
        windowMs: config.bruteForce.limitTime,
        handler: (req, res, next) => next(newError(429, LOCALE.PAGE_ERROR__ERROR_429)),
    });

    app.use(limiter);
};
