// Minify all css, js files
// --------------------------------
const resolvePath = require('../utils/resolvePath');
const minify = require('express-minify');
const minifyHTML = require('express-minify-html');
module.exports = (app) => {
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

    app.use((req, res, next) => {
        if (/\.min\.(css|js)$/.test(req.url)) {
            res.minifyOptions = res.minifyOptions || {};
            res.minifyOptions.minify = false;
        }
        next();
    });
    app.use(
        minify({
            cache: resolvePath('cache')
        })
    );
};
