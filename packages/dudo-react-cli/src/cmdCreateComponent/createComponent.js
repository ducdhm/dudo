const { getTargetPath, logger } = require('../utils');
const initStructure = require('@dudojs/init-structure');
const path = require('path');

module.exports = (name, options) => {
    const { page } = options;
    logger.info(`Create "${name}" component`);

    const arr = name.replace(/\\/g, '/').split('/');

    let isSub = false;
    let componentName = name;
    let componentFolder = 'components';

    if (page) {
        componentFolder = 'pages';
    }

    if (arr.length > 1) {
        componentName = arr[1];
        componentFolder = 'pages';
    }

    const structure = {};
    if (arr.length === 1) {
        structure[componentName] = {};
        structure[componentName][`index.js`] = path.join(__dirname, './template/component.index.hbs');
        structure[componentName][`${componentName}.js`] = path.join(__dirname, './template/component.js.hbs');
        structure[componentName][`${componentName}.scss`] = path.join(__dirname, './template/component.scss.hbs');
    } else {
        const pageName = arr[0];
        componentName = arr[1];
        structure[pageName] = {};
        structure[pageName][componentName] = {};
        structure[pageName][componentName][`index.js`] = path.join(__dirname, './template/component.index.hbs');
        structure[pageName][componentName][`${componentName}.js`] = path.join(__dirname, './template/component.js.hbs');
        structure[pageName][componentName][`${componentName}.scss`] = path.join(__dirname, './template/component.scss.hbs');
        isSub = true;
    }

    initStructure({
        target: getTargetPath(`src/${componentFolder}`),
        structure,
        fileData: {
            name: componentName,
            isSub,
        },
    });

    logger.info(`=> Done!`);
};
