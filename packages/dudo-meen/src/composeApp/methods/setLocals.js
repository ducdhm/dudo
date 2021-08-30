const edge = require('edge.js');

module.exports = (app, key, value) => {
    edge.global(key, value);
};
