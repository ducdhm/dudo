const {
    composeApp,
    setupApi,
    handleError
} = require('meen');
const app = composeApp('api',
    {
        handleError: {
            isJson: true
        }
    },
    [
        setupApi,
        require('./api/routes/ping'),
        require('./api/routes/user'),
        require('./api/routes/todo'),
        handleError
    ]
);


// Run app
// --------------------------------
app.run();
