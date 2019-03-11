module.exports = {
    bodyParser: require('../plugins/bodyParser'),
    compression: require('../plugins/compression'),
    cors: require('../plugins/cors'),
    minify: require('../plugins/minify'),
    mongoose: require('../plugins/mongoose'),
    morgan: require('../plugins/morgan'),
    passport: require('../plugins/passport'),
    session: require('../plugins/session'),
    publicFolder: require('../plugins/publicFolder'),
    view: require('../plugins/view'),
    locals: require('../plugins/locals'),
    
    setupApi: require('./setupApi'),
    setupWebsite: require('./setupWebsite'),
    
    handleError: require('./handleError'),
    
    composeApp: require('./composeApp')
};
