const ServerSchema = require('../schema/ServerSchema');
const ProjectSchema = require('../schema/ProjectSchema');
const Realm = require('realm');

const connectRealm = () => {
    return Realm.open({
        path: 'auto-deploy',
        schema: [
            ServerSchema,
            ProjectSchema,
        ],
    });
};

module.exports = connectRealm;
