// Setup for Session
// --------------------------------
const config = require('../utils/config');
const cookieParser = require('cookie-parser');
const session = require('express-session');
module.exports = (app) => {
    app.use(cookieParser());
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
