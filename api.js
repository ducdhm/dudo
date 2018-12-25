const log = require('./app/utils/logger')('api');
const env = require('./app/utils/env');
const config = require('./app/utils/config');


// API app
// --------------------------------
const app = require('./app/core/app');
require('./app/core/bodyParser')(app);
require('./app/core/morgan')(app);
require('./app/core/mongoose')();


// CORS setup
// --------------------------------
const cors = require('cors');
app.use(cors());


// API Route Config
// --------------------------------
require('./app/api/ping')(app);
require('./app/api/user')(app);
require('./app/api/todo')(app);


// Test API Working
// --------------------------------
app.get('/ping', (req, res) => {
    res.send('pong');
});


// Error handlers
// --------------------------------
const errorHandlers = require('./app/utils/errorHandlers');
app.use((req, res, next) => {
    next(errorHandlers.error404('Page Not Found'));
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

    if (!debugMode && error.status === 500) {
        error.message = 'Server Internal Error';
    }

    return res.status(error.status).json({
        status: false,
        code: error.status,
        message: error.message
    });
});


// Run app
// --------------------------------
app.listen(
    config.apiPort,
    () => log.info('Webservice started at http://localhost:' + config.apiPort)
);
