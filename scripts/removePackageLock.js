const fs = require('fs');
const path = require('path');

const packageFolderPath = path.join(__dirname, '../packages')
const packageFolderList = fs.readdirSync(packageFolderPath);
for (let folder of packageFolderList) {
    const packageLock = path.join(packageFolderPath, folder, 'package-lock.json');
    fs.existsSync(packageLock) && fs.unlinkSync(packageLock);
}
