const categoryController = require('../controllers/category');
const auth = require('connect-ensure-login').ensureLoggedIn();
const adminAuth = require('../auth/admin');

module.exports = (app) => {
    app.get(
        '/category',
        auth, adminAuth,
        categoryController.showCategorys
    );
    
    app.get(
        '/category/:categoryId',
        auth, adminAuth,
        categoryController.resolver,
        categoryController.showCategoryDetails
    );
    
    app.post(
        '/category/:categoryId',
        auth, adminAuth,
        categoryController.resolver,
        categoryController.saveCategory
    );
    
    app.post(
        '/category/:categoryId/delete',
        auth, adminAuth,
        categoryController.resolver,
        categoryController.deleteCategory
    );
};
