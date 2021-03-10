const fs = require('fs');
const path = require('path');

module.exports = (dir, folderList = []) => {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const stat = fs.statSync(path.join(dir, file));
        if (stat.isDirectory()) {
            folderList.push(path.join(dir, file));
        }
    }
    
    return folderList;
};
