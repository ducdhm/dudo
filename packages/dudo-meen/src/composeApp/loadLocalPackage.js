const path = require('path');
const { resolvePath, getFolderList } = require('@dudojs/node-utils');

module.exports = (app, logger) => {
    const localFolder = resolvePath('@local');
    getFolderList(localFolder).forEach(folder => {
        const folderInfo = path.parse(folder);

        if (folderInfo.name === 'config') {
            return;
        }

        try {
            app[`$${folderInfo.name}`] = require(folder);
        } catch (e) {
            logger.warn(`Error when loading "@local/${folderInfo.name}" package\n%o`, e);
        }
    });
};
