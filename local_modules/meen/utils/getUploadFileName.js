module.exports = (fileName) => {
    let lastDotIndex = fileName.lastIndexOf('.');
    let name = fileName.substring(0, lastDotIndex);
    let extension = fileName.substring(lastDotIndex + 1, fileName.length);
    let timestamp = Date.now();
    
    return `${name}___${timestamp}.${extension}`;
};
