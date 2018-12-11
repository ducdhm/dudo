// Setup for Session
// --------------------------------
module.exports = (app) => {
    const config = require('../utils/config');

    const cookieParser = require('cookie-parser');
    app.use(cookieParser());

    const session = require('express-session');
    app.use(
        session({
            secret: config.session.secret,
            resave: true,
            saveUninitialized: true,
            cookie: {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // in milliseconds, total 7 days
                maxAge: 7 * 24 * 60 * 60 * 1000 // in milliseconds, total 7 days
            }
        })
    );
};
