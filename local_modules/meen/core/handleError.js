const {errorHandlers} = require('../utils/');

module.exports = (app, config) => {
    const log = app.logger('ERROR');
    
    app.use((req, res, next) => {
        next(errorHandlers.error404());
    });
    
    app.use((error, req, res, next) => {
        error.code = error.code || 500;
        
        // add this line to include winston logging
        log.error(`${error.code} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip} \n${error.stack}`);
        
        let debugMode = false;
        if (req.query.hasOwnProperty('debug')) {
            debugMode = true;
        }
        if (config.handleError.debug) {
            debugMode = true;
        }
        
        if (!debugMode && error.code === 500) {
            error.message = 'Server Internal Error';
        }
        
        if (config.handleError && config.handleError.isJson) {
            return errorHandlers.jsonError(error, res);
        } else {
            return res.render('error/error', {
                error: error,
                debugMode: debugMode,
                title: error.code,
                bodyClass: 'page-error',
                app: config.app
            });
        }
    });
};
