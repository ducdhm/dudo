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
    const structure = {
        'public': {
            'static': {
                'media': {

                },
            },
            'index.html': path.join(__dirname, './templates/public/index.html.hbs'),
            'manifest.json': path.join(__dirname, './templates/public/manifest.json.hbs'),
            'robots.txt': path.join(__dirname, './templates/public/robots.txt.hbs'),
        },
        'src': {
            'app': {
                'App.js': path.join(__dirname, './templates/src/app/App.js.hbs'),
                'App.scss': path.join(__dirname, './templates/src/app/App.scss.hbs'),
            },
            'assets': {
                'fonts': {

                },
                'images': {

                },
                'styles': {
                    '_mixins.scss': path.join(__dirname, './templates/src/assets/styles/_mixins.scss.hbs'),
                    '_variables.scss': path.join(__dirname, './templates/src/assets/styles/_variables.scss.hbs'),
                },
            },
            'components': {

            },
            'helpers': {

            },
            'layouts': {

            },
            'redux': {

            },
            'services': {

            },
            'views': {

            },
            'index.js': path.join(__dirname, './templates/src/index.js.hbs'),
        },
        '.babelrc': path.join(__dirname, './templates/.babelrc.hbs'),
        '.env.development': path.join(__dirname, './templates/.env.development.hbs'),
        '.env.production': path.join(__dirname, './templates/.env.production.hbs'),
        '.env.staging': path.join(__dirname, './templates/.env.staging.hbs'),
        '.gitignore': path.join(__dirname, './templates/.gitignore.hbs'),
        'README.md': path.join(__dirname, './templates/README.md.hbs'),
        'package.json': path.join(__dirname, './templates/package.json.hbs'),
    };

    initStructure(targetPath, structure, {
        name: options.name || 'dreact',
        title: options.title || 'Dreact App',            
        description: options.description || 'This app is created by using "@dudojs/react-cli"',        
        color: options.color || '#000000',        
    });
    
    logger.info(`Installing npm depencencies...`);
    execSync('npm install');
    
    logger.info(`=> DONE!`);
};
