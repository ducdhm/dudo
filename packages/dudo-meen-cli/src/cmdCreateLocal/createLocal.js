const { toKebabCase, toTitleCase } = require('@dudojs/utils');
const initStructure = require('@dudojs/init-structure');
const path = require('path');
const { getTargetPath } = require('../utils');

module.exports = (logger) => (options) => {
    const { name } = options;
    logger.info(`Create "${name}" local package`);

    const structure = {};
    structure[name] = {};
    structure[name][`index.js`] = path.join(__dirname, './template/index.hbs');
    structure[name][`package.json`] = path.join(__dirname, './template/package.json.hbs');
    structure[name][`README.md`] = path.join(__dirname, './template/readme.hbs');
    initStructure({
        target: getTargetPath('@local'),
        structure,
        fileData: {
            name,
            nameTitle: toTitleCase(name),
            nameKebab: toKebabCase(name),
        },
    });

    logger.info(`Done!`);
};
