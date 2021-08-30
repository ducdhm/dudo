// CORS setup
// --------------------------------
const cors = require('cors');

module.exports = (app, config) => {
    app.use(
        cors(config.cors),
    );
};
