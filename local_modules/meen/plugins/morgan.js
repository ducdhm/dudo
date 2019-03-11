// Morgan
// --------------------------------
const httpLogger = require('../utils/logger')('HTTP');
const morgan = require('morgan');
module.exports = (app) => {
    app.use(
        morgan(
            ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
            {
                stream: httpLogger.stream
            }
        )
    );
};
