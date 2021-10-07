const { getTargetPath, logger } = require('../utils');
const initStructure = require('@dudojs/init-structure');
const { getFolderList } = require('@dudojs/node-utils');
const path = require('path');

module.exports = (name) => {
    logger.info(`Create "${name}" redux feature`);

    const structure = {};
    structure[name] = {};
    structure[name][`${name}.slice.js`] = path.join(__dirname, './template/redux.slice.hbs');

    initStructure({
        target: getTargetPath(`src/redux`),
        structure,
        fileData: {
            name,
        },
    });

    const folderList = getFolderList(getTargetPath('src/redux'), true);
    const structureStore = {
        'store.js': path.join(__dirname, './template/redux.store.hbs'),
    };

    initStructure({
        target: getTargetPath('src/redux'),
        structure: structureStore,
        fileData: {
            featureList: folderList,
        },
    });

    logger.info(`=> Done!`);
};
