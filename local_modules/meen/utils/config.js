// Environment config
// --------------------------------
const env = require('./env');
const resolvePath = require('../utils/resolvePath');
const config = require(resolvePath('config', env));

module.exports = config;