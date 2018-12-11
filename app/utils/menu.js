const isActive = (menuItem, req) => req.url.indexOf(menuItem.href) === 0;

module.exports = (menuConfig, req) => {
    let subMenu = {};
    menuConfig.forEach(item => {
        if (item.parent) {
            item.active = isActive(item, req);

            subMenu[item.parent] = subMenu[item.parent] || {active: false, items: []};
            subMenu[item.parent].items.push(item);

            if (!subMenu[item.parent].active && item.active) {
                subMenu[item.parent].active = true;
            }
        }
    });

    let menu = menuConfig.filter(item => {
        let iRootMenuItem = !item.parent;
        if (iRootMenuItem) {
            item.active = isActive(item, req);

            if (item.id in subMenu) {
                item.active = subMenu[item.id].active;
                item.children = subMenu[item.id].items;
            }
        }

        return iRootMenuItem;
    });

    return menu;
};
