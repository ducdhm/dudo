// View config
// --------------------------------
const resolvePath = require('../utils/resolvePath');
const env = require('../utils/env');
const expressEdge = require('express-edge');
module.exports = (app, config) => {
    app.use(expressEdge);
    app.set('views', resolvePath(app.id, 'views'));

    // View cache for production
    if (config.view.cache) {
        app.enable('view cache');
    }
};
