const fs = require('fs');
const path = require('path');

const getFileList = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const stat = fs.statSync(path.join(dir, file));
        if (stat.isDirectory()) {
            fileList = getFileList(path.join(dir, file), fileList);
        } else {
            fileList.push(path.join(dir, file));
        }
    }
    
    return fileList;
};

module.exports = getFileList;
