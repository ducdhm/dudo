const {
    composeApp,
    setupWebsite,
    passport,
    locals,
    handleError
} = require('meen');
const app = composeApp('admin',
    [
        setupWebsite,
        passport,
        require('./admin/auth/local'),
        locals,
        require('./admin/routes/login'),
        require('./admin/routes/dashboard'),
        require('./admin/routes/user'),
        require('./admin/routes/image'),
        handleError
    ]
);


// Run app
// --------------------------------
app.run();
