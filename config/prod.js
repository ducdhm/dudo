const deepExtend = require('deep-extend');
const commonConfig = require('./common');

module.exports = deepExtend(commonConfig, {
    mongodb: {
        url: 'mongodb://localhost/meen'
    }
});