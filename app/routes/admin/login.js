const app = require('../../core/app');
const loginController = require('../../controllers/admin/login');

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
