const resolvePath = require('../utils/resolvePath');

module.exports = {
    mongoose: {
        options: {
            useNewUrlParser: true
        }
    },
    cors: '*',
    logFile: false,
    session: {
        secret: 'm.e.e.n',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // in milliseconds, total 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000 // in milliseconds, total 7 days
    },
    publicFolder: {
        path: resolvePath('public')
    },
    minify: false,
    view: {
        cache: false
    },
    handleError: {
        enabled: false,
        debug: true,
        isJson: false
    }
};
