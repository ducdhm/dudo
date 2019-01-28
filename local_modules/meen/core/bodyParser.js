// Body parser
// --------------------------------
const bodyParser = require('body-parser');
module.exports = (app) => {
    // for parsing application/json
    app.use(bodyParser.json());

    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: true
    }));
};
