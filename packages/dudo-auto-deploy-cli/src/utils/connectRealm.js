const ServerSchema = require('../schema/ServerSchema');
const ProjectSchema = require('../schema/ProjectSchema');
const Realm = require('realm');
const HOME_DIR = require('os').homedir();
const path = require('path');
const fs = require('fs');

const autoDeployPath = path.join(HOME_DIR, '.dudojs', 'auto-deploy');

if (!fs.existsSync(autoDeployPath)) {
    fs.mkdirSync(autoDeployPath, {
        recursive: true,
    });
}

const connectRealm = () => {
    return Realm.open({
        path: path.join(autoDeployPath, 'config'),
        schema: [
            ServerSchema,
            ProjectSchema,
        ],
    });
};

module.exports = connectRealm;
