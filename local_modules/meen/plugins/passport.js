// Initialize passport and authentication
// --------------------------------
const passport = require('passport');
module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
};
