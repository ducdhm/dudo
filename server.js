const app = require('./app/core');
const config = require('./app/utils/config');
const env = require('./app/utils/env');
const log = require('./app/utils/logger')('adminSite');


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
require('./app/routes/loginRoute');
require('./app/routes/dashboardRoute');
require('./app/routes/userRoute');
require('./app/routes/imageRoute');


// Error page
// --------------------------------
const errorHandlers = require('./app/utils/errorHandlers');
app.use((req, res, next) => {
    next(errorHandlers.error404());
});

app.use((error, req, res, next) => {
    error.status = error.status || 500;

    // add this line to include winston logging
    log.error(`${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip} \n${error.stack}`);

    let debugMode = false;

    if (req.query.hasOwnProperty('debug')) {
        debugMode = true;
    }

    if (env === 'dev') {
        debugMode = true;
    }

    return res.render('error/error', {
        error: error,
        debugMode: debugMode,
        title: 'Lỗi ' + error.status,
        bodyClass: 'page-error',
        app: config.app
    });
});


// Run app
// --------------------------------
app.listen(
    config.adminPort,
    () => log.info('Webserver started at http://localhost:' + config.adminPort)
);
