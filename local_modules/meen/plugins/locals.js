const edge = require('edge.js');
const utilMenu = require('../utils/menu');
const resolvePath = require('../utils/resolvePath');

module.exports = (app, config) => {
    const log = app.logger('locals');
    
    app.use((req, res, next) => {
        if (req.method.toLowerCase() === 'get' && !/^.*(\/public\/).*$/.test(req.url)) {
            edge.global('app', config.app);
            edge.global('uploadPath', config.uploadPath);
            
            try {
                const configIcons = require(resolvePath('config', 'icon'));
                edge.global('ICONS', configIcons);
            } catch (e) {
                log.warn(`Can not set "ICONS" for locals: \n%o`, e);
            }
            
            try {
                const configMenus = require(resolvePath('config', 'menu'));
                edge.global('menus', utilMenu(configMenus, req));
            } catch (e) {
                log.warn(`Can not set "menus" for locals: \n%o`, e);
            }
            
            edge.global('currentUser', req.user);
            edge.global('formatter', require('../utils/formatter'));
            
            let isIframeMode = req.query.hasOwnProperty('iframe');
            edge.global('isIframeMode', isIframeMode);
            
            edge.global('layoutName', `layout/${app.id}Layout`);
            
            typeof config.locals === 'function' && config.locals.call(null, edge, req);
        }
        
        return next();
    });
};