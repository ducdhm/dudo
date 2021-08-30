const { newError } = require('@dudojs/utils');
const checkPermission = require('./checkPermission');

module.exports = (app, permission) => async (req, res, next) => {
    const { LOCALE } = app;

    if (!checkPermission(app, req, permission)) {
        return next(newError(403, LOCALE.PAGE_ERROR__ERROR_403));
    }

    next();
};
