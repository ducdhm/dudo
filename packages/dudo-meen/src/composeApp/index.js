const express = require('express');
const http = require('http');
const { getWinstonLogger } = require('@dudojs/node-utils');
const buildMenu = require('./methods/buildMenu');
const initResolver = require('./methods/initResolver');
const initUploader = require('./methods/initUploader');
const initPaginator = require('./methods/initPaginator');
const redirectTo = require('./methods/redirectTo');
const checkPermission = require('./methods/checkPermission');
const requirePermission = require('./methods/requirePermission');
const checkRole = require('./methods/checkRole');
const requireRole = require('./methods/requireRole');
const initFormatter = require('./methods/initFormatter');
const returnJsonError = require('./methods/returnJsonError');
const setLocals = require('./methods/setLocals');
const getUrl = require('./methods/getUrl');
const loadLocalPackage = require('./loadLocalPackage');
const getConfig = require('./getConfig');

module.exports = (appName, config, modules) => {
    const logger = getWinstonLogger('composeApp', 'info');

    // Overloading options
    // --------------------------------
    if (typeof modules === 'undefined') {
        modules = config;
        config = {};
    }

    // Config
    // --------------------------------
    const appConfig = getConfig(appName, config, logger);
    const app = express();
    const server = http.createServer(app);
    app.enable('strict routing');
    app.id = appName;
    app.server = server;
    app.config = appConfig;
    app.LOCALE = appConfig.locales[appConfig.lang];

    // Get logger with app name
    // --------------------------------
    app.logger = (category) => {
        return getWinstonLogger(category, appConfig.logger.level, appConfig.logger.logFile, appName);
    };

    // Alias of "listen" method
    // --------------------------------
    app.run = () => {
        let appPort = appConfig.port[appName];

        server.listen(
            appPort,
            () => logger.info(`Server "${appName}" (v${appConfig.info.version}) server started at http://localhost:${appPort}`),
        );
    };

    // Auto load @local package
    // --------------------------------
    appConfig.loadLocalPackage.enabled && loadLocalPackage(app, logger);

    // Methods
    // --------------------------------
    app.buildMenu = (menuConfig, req) => buildMenu(app, menuConfig, req);

    // Init resolver
    app.initResolver = (Model, propName, handler, ignoreNew) => initResolver(app, Model, propName, handler, ignoreNew);

    // Init uploader
    app.initUploader = (options) => initUploader(app, options);

    // Require permission middlewares
    app.requirePermission = (permission) => requirePermission(app, permission);

    // Check permission
    app.checkPermission = (req, permission) => checkPermission(app, req, permission);

    // Require role middlewares
    app.requireRole = (roleList) => requireRole(app, roleList);

    // Check role
    app.checkRole = (req, roleList) => checkRole(app, req, roleList);

    // Init paginator
    app.initPaginator = (Model, originItemPerPage) => initPaginator(app, Model, originItemPerPage);

    // Init formatter
    app.initFormatter = (extraFormatter) => initFormatter(app, extraFormatter);

    // Redirect with query string
    app.redirectTo = (url, ignoreQueryList) => redirectTo(app, url, ignoreQueryList);

    // Return error as JSON format
    app.returnJsonError = returnJsonError;

    // Set locals
    app.setLocals = (key, value) => setLocals(app, key, value);

    // Set locals
    app.getUrl = (url) => getUrl(app, url);

    // Preset
    // --------------------------------
    switch (appConfig.preset) {
        case 'website':
            require('../modules/compression')(app, appConfig);
            require('../modules/publicFolder')(app, appConfig);
            require('../modules/view')(app, appConfig);
            require('../modules/session')(app, appConfig);
            require('../modules/bodyParser')(app, appConfig);
            require('../modules/mongoose')(app, appConfig);
            require('../modules/morgan')(app, appConfig);
            break;

        case 'api':
            appConfig.handleError.isJson = true;

            require('../modules/cors')(app, appConfig);
            require('../modules/bodyParser')(app, appConfig);
            require('../modules/mongoose')(app, appConfig);
            require('../modules/morgan')(app, appConfig);
            break;

        default:
        // Do nothing
    }

    // Load module
    // --------------------------------
    modules.forEach(module => {
        if (typeof module === 'function') {
            module.call(null, app, appConfig);
        }
    });

    // "handleError" module
    // --------------------------------
    if (appConfig.handleError.enabled) {
        require('../modules/handleError')(app, appConfig);
    }

    return app;
};
