// View config
// --------------------------------
const resolvePath = require('../utils/resolvePath');
const env = require('../utils/env');
const expressEdge = require('express-edge');
module.exports = (app) => {
    app.use(expressEdge);
    app.set('views', resolvePath(app.id, 'views'));

    // View cache for production
    if (env.isProd) {
        app.enable('view cache');
    }
};
