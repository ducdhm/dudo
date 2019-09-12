const {errorHandlers} = require('meen-core').utils;
const jwt = require('jsonwebtoken');
const UserModel = require('models/User');

module.exports = (app, config) => {
    const logger = app.logger('auth/api');

    return async (req, res, next) => {
        try {
            if (req.headers &&
                req.headers.authorization &&
                req.headers.authorization.split(' ')[0] === 'JWT') {

                const jwtToken = req.headers.authorization.split(' ')[1];
                const result = await jwt.verify(jwtToken, config.jwt.secret);

                logger.info('Decoder: ' + result.username);

                const user = await UserModel.findOne({
                    query: {
                        username: result.username
                    }
                });

                if (user) {
                    req.user = user;
                    next()
                } else {
                    next(errorHandlers.newError(401, 'Unauthorized user!'));
                }
            } else {
                next(errorHandlers.newError(401, 'Unauthorized user!'));
            }
        } catch (error) {
            next(error);
        }
    };
};
