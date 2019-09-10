const composeApp = require('composeApp');

module.exports = (plugins) => {
    return composeApp(
        (app) => {
            require('../plugins/compression')(app);
            require('../plugins/minify')(app);
            require('../plugins/publicFolder')(app);
            require('../plugins/view')(app);
            require('../plugins/session')(app);
            require('../plugins/bodyParser')(app);
            require('../plugins/mongoose')(app);
            require('../plugins/morgan')(app);
        },
        ...plugins
    )
};
