// Static folder
// --------------------------------
const express = require('express');

module.exports = (app, config) => {
    const logger = app.logger('STATIC');
    const setupStatic = (publicFolderPath) => express.static(
        publicFolderPath,
        config.publicFolder.debug ? {
            index: false,
            setHeaders: (response, filePath) => {
                // Logging work
                logger.debug(`"${response.req.originalUrl}" -> "${filePath}"`);
            },
        } : null,
    );

    if (typeof config.publicFolder.path === 'string') {
        app.use(setupStatic(config.publicFolder.path));
    } else {
        for (let url in config.publicFolder.path) {
            app.use(url, setupStatic(config.publicFolder.path[url]));
        }
    }
};
