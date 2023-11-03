const path = require('path')
const fs = require('fs')

const genFileName = (targetPath, fileName, count, extension) => {
  const newFileName = fileName + '_' + count.toString().padStart(3, '0')

  if (fs.existsSync(path.join(targetPath, newFileName + extension))) {
    return genFileName(targetPath, fileName, count + 1, extension)
  }

  return newFileName
}

module.exports = (targetPath, fileName, extension) => {
  if (fs.existsSync(path.join(targetPath, fileName + extension))) {
    return genFileName(targetPath, fileName, 1, extension)
  }

  return fileName
}
