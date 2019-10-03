const { composeApp } = require('meen-core');

composeApp(
    'api',
    {
        preset: 'api',
        handleError: {
            isJson: true
        }
    },
    [
        require('./api/routes/ping'),
        require('./api/routes/user'),
        require('./api/routes/todo'),
    ]
).run();
