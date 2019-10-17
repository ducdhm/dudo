const auth = require('connect-ensure-login').ensureLoggedIn();
const adminAuth = require('../../auth/admin');

module.exports = (app, controller) => {
    app.get(
        '/catalog',
        auth, adminAuth,
        controller.showCatalogs
    );
    
    app.get(
        '/catalog/:catalogId',
        auth, adminAuth,
        controller.resolver,
        controller.showCatalogDetails
    );
    
    app.post(
        '/catalog/:catalogId',
        auth, adminAuth,
        controller.resolver,
        controller.saveCatalog
    );
    
    app.post(
        '/catalog/:catalogId/delete',
        auth, adminAuth,
        controller.resolver,
        controller.deleteCatalog
    );
};
