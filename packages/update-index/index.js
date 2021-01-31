const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');

const updateIndex = (target, destination, mode, prefix, suffix) => {
    const children = fs.readdirSync(target);
    let acceptList = {};

    for (const child of children) {
        const stat = fs.statSync(path.join(target, child));
        const info = path.parse(child);

        if (
            (!mode && ((info.ext === '.js' && info.name !== 'index') || info.ext === '')) ||
            (mode === 'FILE' && stat.isFile() && info.ext === '.js' && info.name !== 'index') ||
            (mode === 'FOLDER' && stat.isDirectory())
        ) {
            acceptList[(prefix || '') + info.name + (suffix || '')] = (path.relative(target, destination) || '.').replace(/\\/g, '/') + '/' + child;
        }
    }


    const template = fs.readFileSync(path.join(__dirname, 'index.hbs'), 'utf8');
    const content = Handlebars.compile(template)({
        acceptList,
    });

    fs.writeFileSync(path.join(destination, 'index.js'), content);
};

module.exports = updateIndex;
