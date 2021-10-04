const { getTargetPath, logger } = require('../utils');
const initStructure = require('@dudojs/init-structure');
const path = require('path');

module.exports = (name, options) => {
    const { page, layout } = options;
    logger.info(`Create "${name}" component`);

    let componentFolder = 'components';
    if (page) {
        componentFolder = 'pages';
    }
    if (layout) {
        componentFolder = 'layouts';
    }

    const structure = {};
    structure[name] = {};
    structure[name][`index.js`] = path.join(__dirname, './template/component.index.hbs');
    structure[name][`${name}.component.js`] = path.join(__dirname, './template/component.component.hbs');
    structure[name][`${name}.style.scss`] = path.join(__dirname, './template/component.style.hbs');

    initStructure({
        target: getTargetPath(`src/${componentFolder}`),
        structure,
        fileData: {
            name,
        },
    });

    logger.info(`=> Done!`);
};
