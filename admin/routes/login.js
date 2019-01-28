const loginController = require('../controllers/login');

module.exports = (app) => {
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
};
