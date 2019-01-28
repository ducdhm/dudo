const env = require('meen/utils/env');
const errorHandlers = require('meen/utils/errorHandlers');

module.exports = (app) => {
    const logger = require('meen/utils/logger')('ERROR');
    
    app.use((req, res, next) => {
        next(errorHandlers.error404('Page Not Found'));
    });
    
    app.use((error, req, res, next) => {
        error.status = error.status || 500;
        
        // add this line to include winston logging
        logger.error(`${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip} \n${error.stack}`);
        
        let debugMode = false;
        
        if (req.query.hasOwnProperty('debug')) {
            debugMode = true;
        }
        
        if (env === 'dev') {
            debugMode = true;
        }
        
        if (!debugMode && error.status === 500) {
            error.message = 'Server Internal Error';
        }
        
        return res.status(error.status).json({
            status: false,
            code: error.status,
            message: error.message
        });
    });
};
