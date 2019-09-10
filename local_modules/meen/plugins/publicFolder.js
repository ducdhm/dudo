// Static folder
// --------------------------------
const express = require('express');
module.exports = (app, config) => {
    app.use(
        '/public',
        express.static(
            config.publicFolder.path
        )
    );
};
