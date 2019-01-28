const path = require('path');
const rootPath = require('get-root-path').default;

module.exports = (...args) => path.join(rootPath, ...args);
