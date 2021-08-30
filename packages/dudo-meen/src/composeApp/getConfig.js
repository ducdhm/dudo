const fs = require('fs');
const path = require('path');
const deepExtend = require('deep-extend');
const defaultConfig = require('./defaultConfig');
const { resolvePath, getFileList } = require('@dudojs/node-utils');

module.exports = (appName, config, logger) => {
    let localFileConfig;
    try {
        localFileConfig = require(resolvePath('@local', 'config', 'app.js'));
    } catch (e) {
        logger.warn(`Error when reading "/@local/config/app.js" file\n%o`, e);
    }

    let appFileConfig = {};
    let appConfig = {};
    let configFolderPath = resolvePath(appName, 'config');
    if (fs.existsSync(configFolderPath)) {
        getFileList(configFolderPath).forEach((file) => {
            const fileInfo = path.parse(file);

            try {
                if (fileInfo.name === 'app') {
                    appConfig = require(file);
                } else {
                    appFileConfig[fileInfo.name] = require(file);
                }
            } catch (e) {
                logger.warn(`Error when reading "${file}" file\n%o`, e);
            }
        });
    }

    return deepExtend(defaultConfig, localFileConfig, appFileConfig, appConfig, config);
};
