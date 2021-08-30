const { newError } = require('@dudojs/utils');

module.exports = (app, config) => {
    const logger = app.logger('ERROR');
    const { LOCALE } = app;

    app.use((req, res, next) => {
        next(newError(404));
    });

    app.use(async (error, req, res, next) => {
        error.code = error.code || 500;

        // Normalize message for common error code
        let message = error.message;
        switch (error.code) {
            case 404:
                error.message = error.message || LOCALE.PAGE_ERROR__ERROR_404;
                break;

            case 500:
                error.message = error.message || LOCALE.PAGE_ERROR__ERROR_500;
                break;

            default:
                error.message = error.message || LOCALE.PAGE_ERROR__ERROR_500;
        }

        // Add this line to include winston logging
        logger.error(`${error.code} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip} \n${error.stack}`);

        // Add error to request
        req.error = error;

        // Delete error stack
        delete error.stack;

        if (config.handleError.isJson || req.xhr || req.returnJsonError) {
            // Support Dropzone
            if (req.headers['x-dropzone'] === 'true') {
                return res.status(error.code).json(error.message);
            } else {
                return res.json({
                    status: false,
                    code: error.code,
                    message: error.message,
                    error,
                });
            }
        } else {
            let title = LOCALE.PAGE_ERROR__TITLE;
            title = title.replace('{{ERROR_CODE}}', error.code);

            return res.render('error/error', {
                error,
                title,
                bodyClass: 'page-error',
                app: config.app,
            });
        }
    });
};
