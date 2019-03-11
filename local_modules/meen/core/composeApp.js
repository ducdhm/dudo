const express = require('express');
const deepExtend = require('deep-extend');
const logger = require('../utils/logger');
const resolvePath = require('../utils/resolvePath');
const env = require('../utils/env');
let envConfig;
try {
    envConfig = require(resolvePath('config', env.name));
} catch (e) {
    console.log('ERROR when getting environment config: \n', e);
}

module.exports = (appName, config = {}, plugins) => {
    if (Array.isArray(config)) {
        plugins = config;
        config = {};
    }
    
    const app = express();
    const log = logger('composeApp', 'meen-core');
    app.id = appName;
    app.config = deepExtend(envConfig, config);
    
    app.logger = (category) => {
        return logger(category, appName);
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
            plugin.call(null, app);
        }
    });
    
    return app;
};
