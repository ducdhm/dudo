const DEFAULTS = {
    isApi: false,
    passportEnabled: true
};
const express = require('express');
const logger = require('meen/utils/logger');
const app = express();

module.exports = (appName, options = DEFAULTS) => {
    const {
        isApi,
        passportEnabled
    } = options;
    
    if (isApi) {
        require('./cors')(app);
    } else {
        require('./compression')(app);
        require('./minify')(app);
        require('./static')(app);
        require('./view')(app, appName);
        require('./session')(app);
    }
    
    require('./bodyParser')(app);
    require('./mongoose')();
    require('./morgan')(app);
    
    if (passportEnabled) {
        require('./passport')(app);
    }
    
    app.logger = (category) => {
        return logger(category, appName);
    };
    
    return app;
};
