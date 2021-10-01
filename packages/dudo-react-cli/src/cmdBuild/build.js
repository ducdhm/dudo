const { getTargetPath, getFileName, logger } = require('../utils');
const { execSync } = require('child_process');
const archiver = require('archiver');
const logUpdate = require('log-update');
const moment = require('moment');
const fs = require('fs');

module.exports = (options) => {
    const { script = 'npm run build', prefix } = options;
    logger.info('Building source...');
    execSync(script);

    const targetPackage = require(getTargetPath('./package.json'));
    const zipName = getFileName(getTargetPath(), `${prefix ? prefix + '_' : ''}${targetPackage.name}-${moment().format('YYYYMMDD')}`, '.zip') + '.zip';
    const zipPath = getTargetPath(zipName);
    logger.info('Zipping "build" folder...');

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', {
        zlib: { level: 9 },
    });

    output.on('close', function () {
        let size = archive.pointer() / 1024 / 1024;

        logUpdate.clear();
        logUpdate.done();
        logger.info(`"${zipName}" is created (size: ${size.toFixed(2)} MB)`);
    });

    output.on('end', function () {
        logUpdate.done();
    });

    archive.on('progress', function ({ entries, fs }) {
        logUpdate(`Processing ${entries.processed}/${entries.total} entries...`);
    });

    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            console.log('WARNING', err);
        } else {
            // throw error
            throw err;
        }
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);
    archive.directory(getTargetPath('./build/'), 'build');
    archive.finalize();
};
