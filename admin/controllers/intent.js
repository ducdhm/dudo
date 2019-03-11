const errorHandlers = require('meen/utils/errorHandlers');
const IntentModel = require('models/Intent');

module.exports = (app) => {
    const logger = app.logger('controllers/intent');
    const intentController = {};
    intentController.resolver = async (req, res, next) => {
        const intentId = req.params.intentId;
        let intent = null;
        
        if (IntentModel.isValidId(intentId)) {
            intent = await IntentModel.findById(intentId);
        }
        
        if (intentId === 'new') {
            intent = IntentModel.create();
        }
        
        if (intent === null) {
            return next(errorHandlers.error404());
        }
        
        req._intent = intent;
        next();
    };
    
    intentController.showIntents = async (req, res) => {
        try {
            const intents = await IntentModel.find();
            logger.debug('getIntents =>%o', intents);
            
            return res.render('intent/index', {
                title: 'Manage intents',
                intents
            });
        } catch (err) {
            next(err);
        }
    };
    
    intentController.showIntentDetails = async (req, res, next) => {
        const intentId = req.params.intentId;
        
        try {
            const intent = intentId === 'new' ? null : req._intent;
            
            return res.render('intent/details', {
                title: intentId === 'new' ? 'Add intent' : 'Edit intent',
                intent
            });
        } catch (err) {
            next(err);
        }
    };
    
    intentController.saveIntent = async (req, res, next) => {
        try {
            await IntentModel.save(req._intent, req.body, populateIntent);
            
            return res.json({
                status: true
            });
        } catch (err) {
            return errorHandlers.jsonError(err, res);
        }
    };
    
    intentController.deleteIntent = async (req, res, next) => {
        try {
            await IntentModel.delete(req._intent);
            
            return res.json({
                status: true
            });
        } catch (err) {
            return errorHandlers.jsonError(err, res);
        }
    };
    
    return intentController;
};

function populateIntent(intent, payload) {
    intent.name = payload.name;
    intent.catalog = payload.catalog;
    intent.category = payload.category;
    intent.feature = payload.feature;

    return intent;
}
