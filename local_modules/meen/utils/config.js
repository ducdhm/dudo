// Environment config
// --------------------------------
const env = require('./env');
const resolvePath = require('../utils/resolvePath');
const config = require(resolvePath('config', env.name));

module.exports = config;