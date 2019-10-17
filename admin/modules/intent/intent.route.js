const auth = require('connect-ensure-login').ensureLoggedIn();
const adminAuth = require('../../auth/admin');

module.exports = (app, controller) => {
    app.get(
        '/intent',
        auth, adminAuth,
        controller.showIntents
    );
    
    app.get(
        '/intent/:intentId',
        auth, adminAuth,
        controller.resolver,
        controller.showIntentDetails
    );
    
    app.post(
        '/intent/:intentId',
        auth, adminAuth,
        controller.resolver,
        controller.saveIntent
    );
    
    app.post(
        '/intent/:intentId/delete',
        auth, adminAuth,
        controller.resolver,
        controller.deleteIntent
    );
};
