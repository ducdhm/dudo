// Body parser
// --------------------------------
const bodyParser = require('body-parser');

module.exports = (app, config) => {
    // for parsing application/json
    app.use(bodyParser.json(config.bodyParser.json));

    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
};
