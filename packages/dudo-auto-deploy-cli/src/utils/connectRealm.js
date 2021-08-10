const ServerSchema = require('../schema/ServerSchema')
const Realm = require('realm');

module.exports = () => {
    return Realm.open({
        path: 'auto-deploy',
        schema: [ServerSchema],
    });
};
