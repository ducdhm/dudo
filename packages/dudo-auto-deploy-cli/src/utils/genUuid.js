const { UUID } = require('realm').BSON;

const getUuid = () => new UUID().toString();

module.exports = getUuid;
