const app = require('../../core/app');
const intentController = require('../../controllers/intent');
const auth = require('connect-ensure-login').ensureLoggedIn();
const adminAuth = require('../../auth/admin');

app.get(
    '/intent',
    auth, adminAuth,
    intentController.showIntents
);

app.get(
    '/intent/:intentId',
    auth, adminAuth,
    intentController.resolver,
    intentController.showIntentDetails
);

app.post(
    '/intent/:intentId',
    auth, adminAuth,
    intentController.resolver,
    intentController.saveIntent
);

app.post(
    '/intent/:intentId/delete',
    auth, adminAuth,
    intentController.resolver,
    intentController.deleteIntent
);
