const {errorHandlers} = require('meen-core').utils;
const CategoryModel = require('models/Category');

module.exports = (app) => {
    const logger = app.logger('controllers/category');
    const categoryController = {};
    categoryController.resolver = async (req, res, next) => {
        const categoryId = req.params.categoryId;
        let category = null;
        
        if (CategoryModel.isValidId(categoryId)) {
            category = await CategoryModel.findById(categoryId);
        }
        
        if (categoryId === 'new') {
            category = CategoryModel.create();
        }
        
        if (category === null) {
            return next(errorHandlers.error404());
        }
        
        req._category = category;
        next();
    };
    
    categoryController.showCategorys = async (req, res) => {
        try {
            const categorys = await CategoryModel.find();
            logger.debug('getCategorys =>%o', categorys);
            
            return res.render('category/index', {
                title: 'Manage categories',
                categorys
            });
        } catch (err) {
            next(err);
        }
    };
    
    categoryController.showCategoryDetails = async (req, res, next) => {
        const categoryId = req.params.categoryId;
        
        try {
            const category = categoryId === 'new' ? null : req._category;
            
            return res.render('category/details', {
                title: categoryId === 'new' ? 'Add category' : 'Edit category',
                category
            });
        } catch (err) {
            next(err);
        }
    };
    
    categoryController.saveCategory = async (req, res, next) => {
        try {
            await CategoryModel.save(req._category, req.body, populateCategory);
            
            return res.json({
                status: true
            });
        } catch (err) {
            return errorHandlers.jsonError(err, res);
        }
    };
    
    categoryController.deleteCategory = async (req, res, next) => {
        try {
            await CategoryModel.delete(req._category);
            
            return res.json({
                status: true
            });
        } catch (err) {
            return errorHandlers.jsonError(err, res);
        }
    };
    
    return categoryController;
};

function populateCategory(category, payload) {
    category.name = payload.name;

    return category;
}
