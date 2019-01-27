const logger = require('../../utils/logger')('controllers/category');
const errorHandlers = require('../../utils/errorHandlers');
const CategoryModel = require('../../models/Category');

exports.resolver = async (req, res, next) => {
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

exports.showCategorys = async (req, res) => {
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

exports.showCategoryDetails = async (req, res, next) => {
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

exports.saveCategory = async (req, res, next) => {
    try {
        await CategoryModel.save(req._category, req.body, populateCategory);

        return res.json({
            status: true
        });
    } catch (err) {
        return errorHandlers.jsonError(err, res);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        await CategoryModel.delete(req._category);

        return res.json({
            status: true
        });
    } catch (err) {
        return errorHandlers.jsonError(err, res);
    }
};

function populateCategory(category, payload) {
    category.name = payload.name;

    return category;
}
