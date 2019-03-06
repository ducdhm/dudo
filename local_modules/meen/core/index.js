const plugins = require('./plugins');
const locals = require('./locals');

module.exports = {
    composeApp: require('composeApp'),
    locals,
    ...plugins
};
