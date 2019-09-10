const logger = require('./logger')('utils/errorHandlers');

const errorHandlers = {
    newError: (code = 500, msg) => {
        let error = new Error(msg);
        error.code = code;
        
        return error;
    },
    error404: (msg = 'Page Not Found') => errorHandlers.newError(404, msg),
    jsonError: (error, res) => {
        logger.error('%o', error);
        
        return res.json({
            status: false,
            code: error.code,
            message: error.message,
            error: error
        });
    }
};

module.exports = errorHandlers;