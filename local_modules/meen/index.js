module.exports = {
    bodyParser: require('./plugins/bodyParser'),
    compression: require('./plugins/compression'),
    cors: require('./plugins/cors'),
    minify: require('./plugins/minify'),
    mongoose: require('./plugins/mongoose'),
    morgan: require('./plugins/morgan'),
    session: require('./plugins/session'),
    publicFolder: require('./plugins/publicFolder'),
    view: require('./plugins/view'),
    locals: require('./plugins/locals'),
    
    setupApi: require('./core/setupApi'),
    setupWebsite: require('./core/setupWebsite'),
    
    handleError: require('./core/handleError'),
    
    composeApp: require('./core/composeApp'),
    composeWebsiteApp: require('./core/composeWebsiteApp'),
    composeApiApp: require('./core/composeApiApp'),
};
