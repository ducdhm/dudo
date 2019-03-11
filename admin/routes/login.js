module.exports = (app) => {
    const loginController = require('../controllers/login')(app);
    
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
