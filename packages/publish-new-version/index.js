const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');
const rootPath = require('get-root-path').default;
const { execSync } = require('child_process');
const increaseVersionNumber = (currentVersion) => {
    let newVersion = ((+currentVersion.replace(/\./g, '') + 1) + '').replace(/^(\d+)(\d)(\d)$/g, '$1.$2.$3');
    if (newVersion.length < 2) {
        newVersion = `0.0.${newVersion}`;
    } else if (newVersion.length < 3) {
        newVersion = `0.${newVersion}`;
    }

    return newVersion;
};
const logger = {
    info: (msg, ...others) => {
        console.log(`[${colors.blue('INFO')}] ${msg}`, ...others);
    },
    error: (msg, ...others) => {
        console.log(`${colors.red('ERROR')} ${msg}`, ...others);
    },
};

module.exports = async (callback) => {
    try {
        const packageJsonPath = path.join(rootPath, 'package.json');
        const packageJson = require(packageJsonPath);
        const currentVersion = packageJson.version;
        const newVersion = increaseVersionNumber(currentVersion);

        logger.info(`Current version: "${currentVersion}" - new version: "${newVersion}"`);

        logger.info(`Update version: "${newVersion}" to "package.json"`);
        packageJson.version = newVersion;
        fs.writeFileSync(
            packageJsonPath,
            JSON.stringify(packageJson, ' ', 4) + '\n',
            'utf-8',
        );

        if (typeof callback === 'function') {
            await callback(logger);
        }

        const gitMsg = `v${newVersion}`;
        logger.info(`Push to github with message "${gitMsg}"`);
        execSync(`git add .`);
        execSync(`git commit -m "${gitMsg}"`);
        execSync(`git push origin master`);

        const tagMsg = `Release of version ${newVersion}`;
        logger.info(`Create new release with message "${tagMsg}"`);
        execSync(`git tag -a v${newVersion} -m "${tagMsg}"`);
        execSync('git push --tags');

        logger.info(`Publish version "${newVersion}" to "https://www.npmjs.com/"`);
        execSync('npm publish');

        logger.info(`"${newVersion}" is published!`);
    } catch (e) {
        logger.error(`Error when publishing new version:\n`, e);
    }
};
