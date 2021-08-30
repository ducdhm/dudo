// View config
// --------------------------------
const { resolvePath } = require('@dudojs/node-utils');
const minifyHTML = require('express-minify-html-2');
const { config: edgeConfig, engine } = require('express-edge');

module.exports = (app, config) => {
    app.use(engine);
    app.set('views', resolvePath(app.id, 'views'));

    // View cache for production
    edgeConfig({ cache: config.view.cache });

    config.view.minify && app.use(minifyHTML({
        override: true,
        exception_url: false,
        htmlMinifier: {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            minifyJS: true,
        },
    }));
};
