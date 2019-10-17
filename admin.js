const meen = require('meen-core');

meen.composeApp(
    'admin',
    {
        preset: 'website',
    },
    [
        require('./admin/auth/local'),
        require('./admin/views/helper'),
        require('./admin/modules/login'),
        require('./admin/modules/dashboard'),
        require('./admin/modules/user'),
        require('./admin/modules/image'),
    ]
).run();
