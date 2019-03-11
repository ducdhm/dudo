// CORS setup
// --------------------------------
const cors = require('cors');
module.exports = (app) => {
    app.use(
        cors(app.config.cors)
    );
};
