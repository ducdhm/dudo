const { newError } = require('@dudojs/utils');
const checkRole = require('./checkRole');

module.exports = (app, roleList) => async (req, res, next) => {
    const { LOCALE } = app;

    if (!checkRole(req, roleList)) {
        return next(newError(403, LOCALE.PAGE_ERROR__ERROR_403));
    }

    next();
};
