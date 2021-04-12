const path = require('path');

module.exports = {
    API_DEPENDENCIES: {
        'basic-auth': '^2.0.1',
        'bcryptjs': '^2.4.3',
        'connect-ensure-login': '^0.1.1',
        'jsonwebtoken': '^8.4.0',
        'meen-core': '^1.3.3',
        'meen-utils': '^1.0.5',
        'mongoose-unique-validator': '^2.0.3',
    },
    API_TEMPLATE_INDEX: path.join(__dirname, './api/template/index.hbs'),
    API_TEMPLATE_MODULE_PING: path.join(__dirname, './api/template/module.ping.hbs'),
    API_TEMPLATE_MODULE_USER: path.join(__dirname, './api/template/module.user.hbs'),
    API_TEMPLATE_AUTH_JWT: path.join(__dirname, './api/template/auth.jwt.hbs'),
    API_TEMPLATE_AUTH_BASIC: path.join(__dirname, './api/template/auth.basic.hbs'),

    CONFIG_TEMPLATE_APP: path.join(__dirname, './appConfig/template/config.app.hbs'),

    MODELS_DEPENDENCIES: {
        'Models': 'file:local_modules/Models',
    },
    MODELS_TEMPLATE_README: path.join(__dirname, './models/template/readme.hbs'),
    MODELS_TEMPLATE_PACKAGE_JSON: path.join(__dirname, './models/template/packageJson.hbs'),
    MODELS_TEMPLATE_INDEX: path.join(__dirname, './models/template/index.hbs'),
    MODELS_TEMPLATE_USER_INDEX: path.join(__dirname, './models/template/user.index.hbs'),
    MODELS_TEMPLATE_USER_ROLE: path.join(__dirname, './models/template/user.role.hbs'),

    MODULE_TEMPLATE_INDEX: path.join(__dirname, './module/template/index.hbs'),
    MODULE_TEMPLATE_MODEL: path.join(__dirname, './module/template/model.hbs'),
    MODULE_TEMPLATE_CONTROLLER_API: path.join(__dirname, './module/template/controller.api.hbs'),
    MODULE_TEMPLATE_CONTROLLER_WEB: path.join(__dirname, './module/template/controller.web.hbs'),
    MODULE_TEMPLATE_ROUTE_API: path.join(__dirname, './module/template/route.api.hbs'),
    MODULE_TEMPLATE_ROUTE_WEB: path.join(__dirname, './module/template/route.web.hbs'),
};
