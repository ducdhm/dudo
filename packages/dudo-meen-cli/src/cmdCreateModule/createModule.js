const { toPascalCase, toKebabCase, toSentenceCase, toCamelCase } = require('@dudojs/utils');
const initStructure = require('@dudojs/init-structure');
const path = require('path');
const { getTargetPath } = require('../utils');

module.exports = (logger) => (options) => {
    const { name, type = 'website', app } = options;
    logger.info(`Create "${name}" module for "${app}" app`);

    const moduleName = toCamelCase(name);

    const structure = {};
    structure['modules'] = {};
    structure['modules'][moduleName] = {};
    structure['modules'][moduleName][`index.js`] = path.join(__dirname, './template/index.hbs');
    structure['modules'][moduleName][`${moduleName}.route.js`] = path.join(__dirname, `./template/route.${type}.hbs`);
    structure['modules'][moduleName][`${moduleName}.controller.js`] = path.join(__dirname, `./template/controller.${type}.hbs`);
    initStructure({
        target: getTargetPath(app),
        structure,
        fileData: {
            name: name,
            nameCamel: moduleName,
            namePascal: toPascalCase(name),
            nameKebab: toKebabCase(name),
            nameSentence: toSentenceCase(name),
            nameLowerCase: toSentenceCase(name).toLowerCase(),
        },
    });

    logger.info(`Done!`);

};
