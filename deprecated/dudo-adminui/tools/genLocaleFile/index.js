const fs = require('fs');
const path = require('path');
const localePath = path.join(__dirname, '../../locale');
const locales = require('../../locale');
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

for (let lang of langs) {
    fs.writeFileSync(
        path.join(localePath, `${lang.LANG}.js`),
        `const LOCALE = window.LOCALE = ${JSON.stringify(lang, ' ', 4).replace(/"([^"]+)":/g, '$1:')};\nexport default LOCALE;\n`
    );
}
