const fs = require('fs');
const path = require('path');

const packageFolderPath = path.join(__dirname, '../packages')
const packageFolderList = fs.readdirSync(packageFolderPath);
let packageListText = '';
for (let folder of packageFolderList) {
    const packagePath = path.join(packageFolderPath, folder, 'package.json');
    const packageData = require(packagePath);

    packageListText += `* [${packageData.name}](./packages/${folder}): ${packageData.description}\n`;
}

fs.writeFileSync(
    path.join(__dirname, '../README.md'),
    `# DudoJS\nStack of awesome!\n\n\n## Packages\n${packageListText}\n\n## License\nPlease read at [here](./LICENSE.md)\n`,
    'utf8',
);
