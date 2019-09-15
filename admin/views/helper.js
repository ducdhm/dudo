const edge = require('edge.js');
const {buildMenu, resolvePath, formatter} = require('meen-core').utils;

module.exports = (app, config) => {
    app.use((req, res, next) => {
        if (req.method.toLowerCase() === 'get' && !/^.*(\/public\/).*$/.test(req.url)) {
            edge.global('currentUser', req.user);
            edge.global('formatter', formatter);
            
            let isIframeMode = req.query.hasOwnProperty('iframe');
            edge.global('isIframeMode', isIframeMode);
            
            edge.global('layoutName', `layout/${app.id}Layout`);

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