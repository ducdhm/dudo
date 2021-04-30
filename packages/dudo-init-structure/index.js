const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');
const logger = require('@dudojs/logger')();
const Handlebars = require('handlebars');

const genContent = (templateSrc, data = {}) => {
    let template = fs.readFileSync(templateSrc, 'utf8');

    return Handlebars.compile(template)(data);
};

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

const createFromTemplate = (target, templatePath, fileData) => {
    const children = fs.readdirSync(templatePath);
    for (let child of children) {
        const childPath = path.join(templatePath, child);
        const stat = fs.statSync(childPath);
        const info = path.parse(childPath);

        if (stat.isDirectory()) {
            const folderPath = path.join(target, child);
            logger.info(`-> Create "${folderPath}"`);
            makeDir(folderPath);
            createFromTemplate(folderPath, childPath, fileData);
        } else {
            let filePath;
            if (info.ext.indexOf('.hbs') === 0) {
                if (info.ext === '.hbs_') {
                    filePath = path.join(target, info.name + '.hbs');
                    logger.info(`-> Create "${filePath}"`);
                    fs.copyFileSync(childPath, filePath);
                } else {
                    filePath = path.join(target, info.name);
                    logger.info(`-> Create "${filePath}"`);
                    fs.writeFileSync(
                        filePath,
                        genContent(childPath, fileData),
                    );
                }
            } else {
                filePath = path.join(target, child);
                logger.info(`-> Create "${filePath}"`);
                fs.copyFileSync(childPath, filePath);
            }
        }
    }
};

module.exports = ({target, structure, fileData, beforeCreate, beforeItemCreate, onItemCreated, onCreated}) => {
    const callbackOptions = {target, structure, fileData};
    typeof beforeCreate === 'function' && beforeCreate(callbackOptions, logger);

    if (typeof structure === 'string') {
        createFromTemplate(target, structure, fileData);
    } else if (Array.isArray(structure)) {
        for (let _structure of structure) {
            typeof beforeItemCreate === 'function' && beforeItemCreate({ ...callbackOptions, structure: _structure}, logger);

            createFolder(target, _structure, fileData);

            typeof onItemCreated === 'function' && onItemCreated({ ...callbackOptions, structure: _structure}, logger);
        }
    } else {
        createFolder(target, structure, fileData);
    }

    typeof onCreated === 'function' && onCreated(callbackOptions, logger);
};
