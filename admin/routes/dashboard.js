const dashboardController = require('../controllers/dashboard');
const auth = require('connect-ensure-login').ensureLoggedIn();

module.exports = (app) => {
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
