const meen = require('meen');
const app = meen('admin');
const config = require('meen/utils/config');
const log = app.logger('admin');


// Auth
// --------------------------------
require('./admin/auth/local');


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
        edge.global('menus', require('meen/utils/menu')(require('./config/menu'), req));
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
