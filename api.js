const meen = require('meen-core');

meen.composeApp(
    'api',
    {
        preset: 'api',
        handleError: {
            enabled: true,
            isJson: true
        }
    },
    [
        require('./api/routes/ping'),
        require('./api/routes/user'),
        require('./api/routes/todo'),
    ]
).run();
