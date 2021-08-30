const fs = require('fs');
const path = require('path');
const locales = require('../../src/composeApp/locale');
const Handlebars = require('handlebars');
let langs = [];

for (let lang of locales.LANG) {
    langs.push({
        LANG: lang,
    });
}

for (let locale in locales) {
    if (locale !== 'LANG') {
        langs[0][locale] = locales[locale][0];
        langs[1][locale] = locales[locale][1];
    }
}

const template = fs.readFileSync(path.join(__dirname, './index.hbs'), 'utf8');
for (let lang of langs) {
    fs.writeFileSync(
        path.join(__dirname, '..', '..', 'src', 'composeApp', 'locale', `${lang.LANG}.js`),
        Handlebars.compile(template)({
            content: JSON.stringify(lang, ' ', 4).replace(/"([^"]+)":/g, '$1:'),
        }),
    );
}
