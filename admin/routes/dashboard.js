const auth = require('connect-ensure-login').ensureLoggedIn();

module.exports = (app) => {
    const dashboardController = require('../controllers/dashboard')(app);
    
    app.get(
        '/',
        auth,
        (req, res) => res.redirect('/dashboard')
    );
    
    app.get(
        '/dashboard',
        auth,
        dashboardController.showDashboard
    );
};
