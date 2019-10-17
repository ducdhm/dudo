const auth = require('connect-ensure-login').ensureLoggedIn();

module.exports = (app, controller) => {
    app.get(
        '/',
        auth,
        (req, res) => res.redirect('/dashboard')
    );
    
    app.get(
        '/dashboard',
        auth,
        controller.showDashboard
    );
};
