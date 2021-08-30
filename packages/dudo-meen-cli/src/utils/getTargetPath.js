const path = require('path');

module.exports = (targetPath) => {
    const currentFolder = process.cwd();

    const targetFolder = targetPath
        ? path.isAbsolute(targetPath) ? targetPath : path.join(currentFolder, targetPath)
        : currentFolder;

    return targetFolder;
};
