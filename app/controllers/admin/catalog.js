const logger = require('../../utils/logger')('controllers/catalog');
const errorHandlers = require('../../utils/errorHandlers');
const CatalogModel = require('../../models/Catalog');

exports.resolver = async (req, res, next) => {
    const catalogId = req.params.catalogId;
    let catalog = null;

    if (CatalogModel.isValidId(catalogId)) {
        catalog = await CatalogModel.findById(catalogId);
    }

    if (catalogId === 'new') {
        catalog = CatalogModel.create();
    }

    if (catalog === null) {
        return next(errorHandlers.error404());
    }

    req._catalog = catalog;
    next();
};

exports.showCatalogs = async (req, res) => {
    try {
        const catalogs = await CatalogModel.find();
        logger.debug('getCatalogs =>%o', catalogs);

        return res.render('catalog/index', {
            title: 'Manage catalogs',
            catalogs
        });
    } catch (err) {
        next(err);
    }
};

exports.showCatalogDetails = async (req, res, next) => {
    const catalogId = req.params.catalogId;

    try {
        const catalog = catalogId === 'new' ? null : req._catalog;

        return res.render('catalog/details', {
            title: catalogId === 'new' ? 'Add catalog' : 'Edit catalog',
            catalog
        });
    } catch (err) {
        next(err);
    }
};

exports.saveCatalog = async (req, res, next) => {
    try {
        await CatalogModel.save(req._catalog, req.body, populateCatalog);

        return res.json({
            status: true
        });
    } catch (err) {
        return errorHandlers.jsonError(err, res);
    }
};

exports.deleteCatalog = async (req, res, next) => {
    try {
        await CatalogModel.delete(req._catalog);

        return res.json({
            status: true
        });
    } catch (err) {
        return errorHandlers.jsonError(err, res);
    }
};

function populateCatalog(catalog, payload) {
    catalog.name = payload.name;

    return catalog;
}
