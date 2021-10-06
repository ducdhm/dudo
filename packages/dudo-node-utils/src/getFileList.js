const fs = require('fs');
const path = require('path');

const getFileList = (target, nameOnly) => {
    const children = fs.readdirSync(target);
    let fileList = [];

    for (const child of children) {
        const stat = fs.statSync(path.join(target, child));
        if (stat.isFile()) {
            fileList.push(nameOnly ? child : path.join(target, child));
        }
    }

    return fileList;
};

module.exports = getFileList;
