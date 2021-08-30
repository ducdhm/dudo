// Setup for Session
// --------------------------------
const cookieParser = require('cookie-parser');
const session = require('express-session');

module.exports = (app, config) => {
    app.use(cookieParser());
    app.use(
        session({
            secret: config.session.secret,
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: config.session.maxAge,
            },
        }),
    );
};
