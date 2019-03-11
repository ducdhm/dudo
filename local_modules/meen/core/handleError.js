const env = require('../utils/env');
const errorHandlers = require('../utils/errorHandlers');

module.exports = (app) => {
    const log = app.logger('ERROR');
    const {config} = app;
    
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
        
        if (env.isDev) {
            debugMode = true;
        }
        
        if (!debugMode && error.status === 500) {
            error.message = 'Server Internal Error';
        }
        
        if (config.handleError && config.handleError.isJson) {
            return res.status(error.status).json({
                status: false,
                code: error.status,
                message: error.message
            });
        } else {
            let errorTitle = `Error ${error.status}`;
            if (config.handleError && typeof config.handleError.title === 'function') {
                errorTitle = config.handleError.title.call(null, error, error.status);
            }
            
            return res.render('error/error', {
                error: error,
                debugMode: debugMode,
                title: errorTitle,
                bodyClass: 'page-error',
                app: config.app
            });
        }
    });
};
