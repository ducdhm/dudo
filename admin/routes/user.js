const auth = require('connect-ensure-login').ensureLoggedIn();
const adminAuth = require('../auth/admin');

module.exports = (app) => {
    const userController = require('../controllers/user')(app);
    
    app.get(
        '/user',
        auth, adminAuth,
        userController.showUsers
    );
    
    app.get(
        '/user/:userId',
        auth, adminAuth,
        userController.resolver,
        userController.showUserDetails
    );
    
    app.post(
        '/user/:userId',
        auth, adminAuth,
        userController.resolver,
        userController.saveUser
    );
    
    app.post(
        '/user/:userId/delete',
        auth, adminAuth,
        userController.resolver,
        userController.deleteUser
    );
};
