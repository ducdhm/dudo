const logger = require('meen/utils/logger')('controllers/feature');
const errorHandlers = require('meen/utils/errorHandlers');
const FeatureModel = require('models/Feature');

exports.resolver = async (req, res, next) => {
    const featureId = req.params.featureId;
    let feature = null;

    if (FeatureModel.isValidId(featureId)) {
        feature = await FeatureModel.findById(featureId);
    }

    if (featureId === 'new') {
        feature = FeatureModel.create();
    }

    if (feature === null) {
        return next(errorHandlers.error404());
    }

    req._feature = feature;
    next();
};

exports.showFeatures = async (req, res) => {
    try {
        const features = await FeatureModel.find();
        logger.debug('getFeatures =>%o', features);

        return res.render('feature/index', {
            title: 'Manage features',
            features
        });
    } catch (err) {
        next(err);
    }
};

exports.showFeatureDetails = async (req, res, next) => {
    const featureId = req.params.featureId;

    try {
        const feature = featureId === 'new' ? null : req._feature;

        return res.render('feature/details', {
            title: featureId === 'new' ? 'Add feature' : 'Edit feature',
            feature
        });
    } catch (err) {
        next(err);
    }
};

exports.saveFeature = async (req, res, next) => {
    try {
        await FeatureModel.save(req._feature, req.body, populateFeature);

        return res.json({
            status: true
        });
    } catch (err) {
        return errorHandlers.jsonError(err, res);
    }
};

exports.deleteFeature = async (req, res, next) => {
    try {
        await FeatureModel.delete(req._feature);

        return res.json({
            status: true
        });
    } catch (err) {
        return errorHandlers.jsonError(err, res);
    }
};

function populateFeature(feature, payload) {
    feature.name = payload.name;

    return feature;
}
