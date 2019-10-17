const auth = require('connect-ensure-login').ensureLoggedIn();
const adminAuth = require('../../auth/admin');

module.exports = (app, controller) => {
    app.get(
        '/category',
        auth, adminAuth,
        controller.showCategorys
    );
    
    app.get(
        '/category/:categoryId',
        auth, adminAuth,
        controller.resolver,
        controller.showCategoryDetails
    );
    
    app.post(
        '/category/:categoryId',
        auth, adminAuth,
        controller.resolver,
        controller.saveCategory
    );
    
    app.post(
        '/category/:categoryId/delete',
        auth, adminAuth,
        controller.resolver,
        controller.deleteCategory
    );
};
