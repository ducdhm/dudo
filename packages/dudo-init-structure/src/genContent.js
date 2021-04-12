const fs = require('fs');
const Handlebars = require('handlebars');

module.exports = (templateSrc, data = {}) => {
    let template = fs.readFileSync(templateSrc, 'utf8');

    return Handlebars.compile(template)(data);
};
