const app = require('../../core/app');
const env = require('../../utils/env');
const config = require('../../utils/config');
const errorHandlers = require('../../utils/errorHandlers');
const log = require('../../utils/logger')('ERROR');

app.use((req, res, next) => {
    next(errorHandlers.error404());
});

app.use((error, req, res, next) => {
    error.status = error.status || 500;
    
    // add this line to include winston logging
    log.error(`${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip} \n${error.stack}`);
    
    let debugMode = false;
    
    if (req.query.hasOwnProperty('debug')) {
        debugMode = true;
    }
    
    if (env === 'dev') {
        debugMode = true;
    }
    
    return res.render('error/error', {
        error: error,
        debugMode: debugMode,
        title: 'Error ' + error.status,
        bodyClass: 'page-error',
        app: config.app
    });
});
