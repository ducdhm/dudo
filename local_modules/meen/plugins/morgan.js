// Morgan
// --------------------------------
const morgan = require('morgan');
module.exports = (app) => {
    const httpLogger = app.logger('HTTP');
    
    app.use(
        morgan(
            ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
            {
                stream: httpLogger.stream
            }
        )
    );
};
