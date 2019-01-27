// Morgan
// --------------------------------
module.exports = (app) => {
    const httpLogger = require('@utils/logger')('HTTP');
    const morgan = require('morgan');

    app.use(
        morgan(
            ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
            {
                stream: httpLogger.stream
            }
        )
    );
};
