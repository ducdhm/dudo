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
        require('./api/modules/ping'),
        require('./api/modules/user'),
        require('./api/modules/todo'),
    ]
).run();
