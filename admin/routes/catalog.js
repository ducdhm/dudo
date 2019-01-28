const catalogController = require('../controllers/catalog');
const auth = require('connect-ensure-login').ensureLoggedIn();
const adminAuth = require('../auth/admin');

module.exports = (app) => {
    app.get(
        '/catalog',
        auth, adminAuth,
        catalogController.showCatalogs
    );
    
    app.get(
        '/catalog/:catalogId',
        auth, adminAuth,
        catalogController.resolver,
        catalogController.showCatalogDetails
    );
    
    app.post(
        '/catalog/:catalogId',
        auth, adminAuth,
        catalogController.resolver,
        catalogController.saveCatalog
    );
    
    app.post(
        '/catalog/:catalogId/delete',
        auth, adminAuth,
        catalogController.resolver,
        catalogController.deleteCatalog
    );
};
