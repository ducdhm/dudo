const { getTargetPath } = require('../utils');
const fs = require('fs');
const path = require('path');
const initStructure = require('@dudojs/init-structure');
const { execSync } = require('child_process');

module.exports = (logger) => (target, options) => {
    const targetPath = getTargetPath(target);
    logger.info(`Initializing react app at "${targetPath}"...`);

    const children = fs.readdirSync(targetPath);

    if (children.length > 0) {
        logger.error(`"${targetPath}" is not empty!`);
        return;
    }

    logger.info(`Creating structure...`);
    initStructure({
        target: targetPath,
        structure: path.join(__dirname, './template'),
        fileData: {
            name: options.name || 'dreact',
            title: options.title || 'Dreact App',            
            description: options.description || 'This app is created by using "@dudojs/react-cli"',        
            color: options.color || '#000000',        
        },
    });
    
    logger.info(`Installing npm depencencies...`);
    execSync('npm install');
    
    logger.info(`=> DONE!`);
};
