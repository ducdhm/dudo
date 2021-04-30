const initStructure = require('@dudojs/init-structure');
const path = require('path');
const fs = require('fs');
const reduxFolder = path.join(__dirname, '../../src/redux');

let structure = {};
structure['rootSaga.js'] = path.join(__dirname, './templates/index.hbs');

const folderList = fs.readdirSync(reduxFolder, { withFileTypes: true })
    .filter(folder => {
        return folder.isDirectory() && fs.existsSync(path.join(reduxFolder, folder.name, `${folder.name}.saga.js`));
    })
    .map(folder => folder.name)

initStructure(
    reduxFolder,
    structure,
    {
        list: folderList,
    },
    {
        beforeCreate: (options, logger) => {
            logger.info(`Updating rootSaga.js...`);
        },
        onCreated: (options, logger) => {
            logger.info('========== DONE!');
        },
    },
)

