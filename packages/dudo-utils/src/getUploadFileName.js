const removeTone = require('./removeTone');

module.exports = (fileName) => {
    let lastDotIndex = fileName.lastIndexOf('.');
    let name = fileName.substring(0, lastDotIndex)
    name = removeTone(name);
    name = name.replace(/[^a-zA-Z0-9_]/g, ' ');
    name = name.trim();
    name = name.replace(/[^a-zA-Z0-9_]/g, '_');
    name = name.replace(/_+/g, '_');
    let extension = fileName.substring(lastDotIndex + 1, fileName.length);
    let timestamp = Date.now();
    let randomStr = Math.round(Math.random() * 9876543210);

    return `${name}___${timestamp}${randomStr}.${extension.toLowerCase()}`;
};
