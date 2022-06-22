const { getTargetPath, logger } = require('../utils');
const initStructure = require('@dudojs/init-structure');
const path = require('path');

module.exports = (name, options) => {
    let { target, layout, page } = options;
    logger.info(`Create "${name}" component`);

    if (!target) {
        target = './src/components';
    }

    if (layout) {
        target = './src/layouts';
    }

    if (page) {
        target = './src/pages';
    }

    const arr = name.replace(/\\/g, '/').split('/');

    let isSub = false;
    let componentName = name;

    if (arr.length > 1) {
        componentName = arr[1];
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
        target: getTargetPath(target),
        structure,
        fileData: {
            name: componentName,
            isSub,
        },
    });

    logger.info(`=> Done!`);
};
