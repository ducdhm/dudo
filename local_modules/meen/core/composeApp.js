const express = require('express');
const logger = require('../utils/logger');
const deepExtend = require('deep-extend');
const plugins = require('./plugins');
const DEFAULTS = {
    isWebsite: false,
    isApi: false,
    passportEnabled: false
};

const composeApp = (appName, config = {}, ...extraPlugins) => {const app = express();
    app.name = appName;
    app.config = deepExtend(DEFAULTS, config);
    app.logger = (category) => {
        return logger(category, appName);
    };
    
    if (config.isWebsite) {
        plugins.compression(app);
        plugins.minify(app);
        plugins.publicFolder(app);
        plugins.view(app);
        plugins.session(app);
    }
    
    if (config.isApi) {
        plugins.cors(app);
    }
    
    if (config.isWebsite || config.isApi) {
        plugins.bodyParser(app);
        plugins.mongoose(app);
        plugins.morgan(app);
    }
    
    if (config.passportEnabled) {
        plugins.passport(app);
    }
    
    extraPlugins.forEach(plugin => {
        if (typeof plugin === 'function') {
            plugin.call(null, app);
        }
    });
    
    return app;
};

export default composeApp;