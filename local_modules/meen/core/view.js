// View config
// --------------------------------
const resolvePath = require('../utils/resolvePath');
const env = require('../utils/env');
const expressEdge = require('express-edge');
module.exports = (app, appName) => {
    app.use(expressEdge);
    app.set('views', resolvePath(appName, 'views'));

    // View cache for production
    if (env === 'prod') {
        app.enable('view cache');
    }
};
