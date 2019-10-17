const auth = require('connect-ensure-login').ensureLoggedIn();
const adminAuth = require('../../auth/admin');

module.exports = (app, controller) => {
    app.get(
        '/feature',
        auth, adminAuth,
        controller.showFeatures
    );
    
    app.get(
        '/feature/:featureId',
        auth, adminAuth,
        controller.resolver,
        controller.showFeatureDetails
    );
    
    app.post(
        '/feature/:featureId',
        auth, adminAuth,
        controller.resolver,
        controller.saveFeature
    );
    
    app.post(
        '/feature/:featureId/delete',
        auth, adminAuth,
        controller.resolver,
        controller.deleteFeature
    );
};
