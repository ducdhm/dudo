const path = require('path');

module.exports = (targetPath) => {
    const currentFolder = process.cwd();

    return targetPath
        ? path.isAbsolute(targetPath) ? targetPath : path.join(currentFolder, targetPath)
        : currentFolder;
};
