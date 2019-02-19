// Minify HTML on response
// --------------------------------
const minifyHTML = require('express-minify-html');
const env = require('../utils/env');
module.exports = (app) => {
    if (env.isProd) {
        app.use(minifyHTML({
            override: true,
            exception_url: false,
            htmlMinifier: {
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true,
                minifyJS: true
            }
        }));
    }
};
