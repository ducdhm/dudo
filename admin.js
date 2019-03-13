const {
    composeApp,
    setupWebsite,
    locals,
    handleError
} = require('meen');
const app = composeApp('admin',
    [
        setupWebsite,
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
