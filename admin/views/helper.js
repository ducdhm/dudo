const edge = require('edge.js');
const { buildMenu, resolvePath } = require('meen-core').utils;

const formatter = {
    currentYear: (new Date()).getFullYear(),
    inArray: (array, item) => Array.isArray(array) && array.includes(item),
    option: (text, value, defaultValue) => {
        return `<option value="${value}" ${value === defaultValue ? 'selected' : ''}>${text}</option>`;
    },
    radio: (name, value, isChecked, extraClass = '', id) => {
        return `<input type="radio" name="${name}" value="${value}" ${isChecked ? 'checked' : ''} class="${extraClass}" ${id ? `id=${id}` : ''} />`;
    },
    checkbox: (name, value, isChecked, extraClass = '', id) => {
        return `<input type="checkbox" name="${name}" value="${value}" ${isChecked ? 'checked' : ''} class="${extraClass}" ${id ? `id=${id}` : ''} />`;
    },
};

module.exports = (app, config) => {
    app.use((req, res, next) => {
        if (req.method.toLowerCase() === 'get' && !/^.*(\/public\/).*$/.test(req.url)) {
            edge.global('currentUser', req.user);
            edge.global('formatter', formatter);

            let isIframeMode = req.query.hasOwnProperty('iframe');
            edge.global('isIframeMode', isIframeMode);

            edge.global('layoutName', `layout/${app.id}Layout`);

            typeof config.locals === 'function' && config.locals.call(null, edge, req);

            edge.global('app', config.info);
            edge.global('uploadPath', config.uploadPath);

            const configIcons = require(resolvePath('config', 'icon'));
            edge.global('ICONS', configIcons);

            const configMenus = require(resolvePath('config', 'menu'));
            edge.global('menus', buildMenu(configMenus, req));
        }

        return next();
    });
};