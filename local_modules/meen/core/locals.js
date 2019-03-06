const edge = require('edge.js');
const utilMenu = require('../utils/menu');
const resolvePath = require('../utils/resolvePath');

module.exports = (app, setLocals) => {
    const {config} = app;
    const log = app.logger('locals');
    
    app.use((req, res, next) => {
        if (req.method.toLowerCase() === 'get' && !/^.*(\/public\/).*$/.test(req.url)) {
            edge.global('app', config.app);
            edge.global('uploadPath', config.uploadPath);
            
            try {
                const configIcons = require(resolvePath('config', 'icon'));
                edge.global('ICONS', configIcons);
            } catch (e) {
                log.error(`Error when setting "ICONS" for locals: \n%o`, e);
            }
            
            try {
                const configMenus = require(resolvePath('config', 'menu'));
                edge.global('menus', utilMenu(configMenus, req));
            } catch (e) {
                log.error(`Error when setting "menus" for locals: \n%o`, e);
            }
            
            edge.global('currentUser', req.user);
            edge.global('formatter', require('../utils/formatter'));
            
            let isIframeMode = req.query.hasOwnProperty('iframe');
            edge.global('isIframeMode', isIframeMode);
            
            edge.global('layoutName', `layout/${app.name}Layout`);
            
            typeof setLocals === 'function' && setLocals.call(null, edge, req);
        }
        
        return next();
    });
};