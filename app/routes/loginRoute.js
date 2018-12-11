const app = require('../core/app');
const loginController = require('../controllers/loginController');

app.get(
    '/login',
    loginController.checkLogin
);

app.post(
    '/login',

    loginController.doLogin
);

app.get(
    '/logout', loginController.doLogout
);
