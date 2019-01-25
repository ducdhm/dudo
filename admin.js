const app = require('./app/core');
const config = require('./app/utils/config');
const env = require('./app/utils/env');
const log = require('./app/utils/logger')('admin');


// Auth
// --------------------------------
require('./app/auth/local');


// Set locals
// --------------------------------
const edge = require('edge.js');
app.use((req, res, next) => {
    if (req.method.toLowerCase() === 'get' && !/^.*(\/public\/).*$/.test(req.url)) {
        edge.global('app', config.app);
        edge.global('currentUser', req.user);
        edge.global('helper', {
            currentYear: (new Date()).getFullYear()
        });
        edge.global('ICONS', require('./config/icon'));
        edge.global('menus', require('./app/utils/menu')(require('./config/menu'), req));
        edge.global('uploadPath', config.uploadPath);

        let isIframeMode = req.query.hasOwnProperty('iframe');
        edge.global('layoutName', 'layout/adminLayout');
        edge.global('isIframeMode', isIframeMode);

        return next();
    } else {
        return next();
    }
});


// Import modules
// --------------------------------
require('./app/routes/admin/login');
require('./app/routes/admin/dashboard');
require('./app/routes/admin/user');
require('./app/routes/admin/image');
require('./app/routes/admin/error');


// Run app
// --------------------------------
app.listen(
    config.adminPort,
    () => log.info('Webserver started at http://localhost:' + config.adminPort)
);
