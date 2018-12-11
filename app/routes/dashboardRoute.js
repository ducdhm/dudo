const app = require('../core/app');
const dashboardController = require('../controllers/dashboardController');
const auth = require('connect-ensure-login').ensureLoggedIn();

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
