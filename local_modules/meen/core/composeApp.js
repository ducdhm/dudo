const express = require('express');
const deepExtend = require('deep-extend');
const logger = require('../utils/logger');
const defaultConfig = require('./defaultConfig');

module.exports = (appName, config, plugins) => {
    if (Array.isArray(config)) {
        plugins = config;
    }
    
    const app = express();
    const log = logger('composeApp', 'meen-core');
    app.id = appName;
    app.config = deepExtend(defaultConfig, config);
    
    app.logger = (category) => {
        return logger(category, appName, app.config.logFile);
    };
    
    app.run = () => {
        let appPort = app.config[`${appName}Port`];
        
        app.listen(
            appPort,
            () => log.info(`Webserver started at http://localhost:${appPort}`)
        );
    };
    
    plugins.forEach(plugin => {
        if (typeof plugin === 'function') {
            plugin.call(null, app, app.config);
        }
    });
    
    if (config.handleError) {
        require('./handleError')(app, app.config);
    }
    
    return app;
};
