const meen = require('meen');
const app = meen('admin', {
    isApi: true
});
const log = app.logger('api');
const config = require('meen/utils/config');


// API Route Config
// --------------------------------
require('./api/routes/ping')(app);
require('./api/routes/user')(app);
require('./api/routes/todo')(app);
require('./api/routes/error')(app);


// Run app
// --------------------------------
app.listen(
    config.apiPort,
    () => log.info('Webservice started at http://localhost:' + config.apiPort)
);
