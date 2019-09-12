const meen = require('meen-core');

meen.composeApp(
    'admin',
    {
        preset: 'website',
        handleError: {
            enabled: true
        }
    },
    [
        require('./admin/auth/local'),
        require('./admin/views/helper'),
        require('./admin/routes/login'),
        require('./admin/routes/dashboard'),
        require('./admin/routes/user'),
        require('./admin/routes/image'),
    ]
).run();
