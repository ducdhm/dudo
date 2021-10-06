const fs = require('fs');
const path = require('path');

module.exports = (dir, nameOnly) => {
    const children = fs.readdirSync(dir);
    let folderList = [];

    for (const child of children) {
        const stat = fs.statSync(path.join(dir, child));
        if (stat.isDirectory()) {
            folderList.push(nameOnly ? child : path.join(dir, child));
        }
    }

    return folderList;
};
