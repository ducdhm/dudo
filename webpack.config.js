const genWebpackConfig = require('./tools/genWebpackConfig');

module.exports = genWebpackConfig('admin', {
    'admin-libs': './src/admin/index.js',
    admin: './src/admin/admin.js',
    login: './src/admin/login.js',
    image: './src/admin/image.js',
});
