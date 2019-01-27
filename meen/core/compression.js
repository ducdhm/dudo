
// Compress all requests
// --------------------------------
module.exports = (app) => {
    const compression = require('compression');
    app.use(compression());
};
