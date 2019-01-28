// Compress all requests
// --------------------------------
const compression = require('compression');
module.exports = (app) => {
    app.use(compression());
};
