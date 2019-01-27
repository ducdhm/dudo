const app = require('../../core/app');
const featureController = require('../../controllers/feature');
const auth = require('connect-ensure-login').ensureLoggedIn();
const adminAuth = require('../../auth/admin');

app.get(
    '/feature',
    auth, adminAuth,
    featureController.showFeatures
);

app.get(
    '/feature/:featureId',
    auth, adminAuth,
    featureController.resolver,
    featureController.showFeatureDetails
);

app.post(
    '/feature/:featureId',
    auth, adminAuth,
    featureController.resolver,
    featureController.saveFeature
);

app.post(
    '/feature/:featureId/delete',
    auth, adminAuth,
    featureController.resolver,
    featureController.deleteFeature
);
