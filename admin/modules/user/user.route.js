const auth = require('connect-ensure-login').ensureLoggedIn();
const adminAuth = require('../../auth/admin');

module.exports = (app, controller) => {
    app.get(
        '/user',
        auth, adminAuth,
        controller.showUsers
    );
    
    app.get(
        '/user/:userId',
        auth, adminAuth,
        controller.resolver,
        controller.showUserDetails
    );
    
    app.post(
        '/user/:userId',
        auth, adminAuth,
        controller.resolver,
        controller.saveUser
    );
    
    app.get(
        '/profile',
        auth, adminAuth,
        controller.showUserDetails
    );
    
    app.post(
        '/profile',
        auth, adminAuth,
        controller.saveUser
    );
    
    app.post(
        '/user/:userId/delete',
        auth, adminAuth,
        controller.resolver,
        controller.deleteUser
    );
};
