const {
    composeApp,
    locals
} = require('meen');
const app = composeApp('admin', {
    isWebsite: true
});
const config = app.config;
const log = app.logger('admin');


// Auth
// --------------------------------
require('./admin/auth/local');


// Set locals
// --------------------------------
locals(app, (edge, req) => {

});


// Import modules
// --------------------------------
require('./admin/routes/login')(app);
require('./admin/routes/dashboard')(app);
require('./admin/routes/user')(app);
require('./admin/routes/image')(app);
require('./admin/routes/error')(app);


// Run app
// --------------------------------
app.listen(
    config.adminPort,
    () => log.info('Webserver started at http://localhost:' + config.adminPort)
);
