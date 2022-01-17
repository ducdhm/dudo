const fs = require('fs');
const path = require('path');

const getPackageListText = (folderName) => {
    const packageFolderPath = path.join(__dirname, '../' + folderName)
    const packageFolderList = fs.readdirSync(packageFolderPath);
    let result = '';
    for (let folder of packageFolderList) {
        const packagePath = path.join(packageFolderPath, folder, 'package.json');
        const packageData = require(packagePath);

        result += `* [${packageData.name}](./${folderName}/${folder}): ${packageData.description}\n`;
    }

    return result;
};

const packageListText = getPackageListText('packages');
const deprecatedListText = getPackageListText('deprecated');

fs.writeFileSync(
    path.join(__dirname, '../README.md'),
    `# DudoJS\nStack of awesome!\n\n\n## Packages\n${packageListText}\n\n## DEPRECATED\n${deprecatedListText}\n\n## License\nPlease read at [here](./LICENSE.md)\n`,
    'utf8',
);
