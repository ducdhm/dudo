// View config
// --------------------------------
module.exports = (app) => {
    const path = require('path');
    const env = require('../utils/env');
    const expressEdge = require('express-edge');

    app.use(expressEdge);
    app.set('views', path.join(__dirname, '../views'));

    // View cache for production
    if (env === 'prod') {
        app.enable('view cache');
    }
};
