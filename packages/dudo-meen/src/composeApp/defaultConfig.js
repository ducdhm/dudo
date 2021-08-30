const { resolvePath } = require('@dudojs/node-utils');
const en = require('./locale/en');
const vi = require('./locale/vi');

module.exports = {
    lang: 'en',
    locales: {
        en,
        vi,
    },
    baseUrl: '',
    preset: null,
    loadLocalPackage: {
        enabled: false,
    },
    info: {
        title: 'M.E.E.N',
        version: '1.0.0',
    },
    mongoose: {
        debug: false,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    logger: {
        level: 'info',
        logFile: false,
    },
    cors: '*',
    session: {
        secret: 'M.E.E.N',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    publicFolder: {
        path: {
            '/public': resolvePath('public'),
        },
        debug: false,
    },
    view: {
        minify: false,
        cache: false,
    },
    handleError: {
        enabled: true,
        isJson: false,
    },
    bodyParser: {
        json: {
            limit: '5mb',
        },
        urlencoded: {
            limit: '5mb',
            extended: true,
        },
    },
    bruteForce: {
        mongoStore: true,
        collectionName: 'BRUTE_FORCE',
        maxRequest: 60,
        limitTime: 60 * 1000,
    },
    paginator: {
        itemPerPage: 20,
        pageStep: 2,
    },
};
