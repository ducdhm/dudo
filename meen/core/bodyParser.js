// Body parser
// --------------------------------
module.exports = (app) => {
    const bodyParser = require('body-parser');

    // for parsing application/json
    app.use(bodyParser.json());

    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: true
    }));
};
