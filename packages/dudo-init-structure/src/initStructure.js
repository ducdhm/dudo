const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');
const logger = require('@dudojs/logger')();
const genContent = require('./genContent')

const createFolder = (target, data, fileData) => {
    for (let name in data) {
        const childPath = path.join(target, name);

        if (typeof data[name] === 'string') {
            if (fs.existsSync(childPath)) {
                logger.info(`-> Update "${childPath}"`);
            } else {
                logger.info(`-> Create "${childPath}"`);
            }
            fs.writeFileSync(
                childPath,
                genContent(data[name], fileData),
            )
        } else {
            logger.info(`-> Create "${childPath}"`);
            makeDir(childPath);

            createFolder(childPath, data[name], fileData)
        }
    }
};

module.exports = (target, structure, fileData, callback = {}) => {
    typeof callback.beforeCreate === 'function' && callback.beforeCreate({target, structure, fileData}, logger);

    if (Array.isArray(structure)) {
        for (let _structure of structure) {
            typeof callback.beforeItemCreate === 'function' && callback.beforeItemCreate({target, structure: _structure, fileData}, logger);

            createFolder(target, _structure, fileData);

            typeof callback.onItemCreated === 'function' && callback.onItemCreated({target, structure: _structure, fileData}, logger);
        }
    } else {
        createFolder(target, structure, fileData);
    }

    typeof callback.onCreated === 'function' && callback.onCreated({target, structure, fileData}, logger);
};
