const { UUID } = require('realm').BSON;

module.exports = () => new UUID().toString();
