// Static folder
// --------------------------------
module.exports = (app) => {
    const express = require('express');
    const path = require('path');

    app.use(
        '/public',
        express.static(
            path.join(__dirname, '../../public')
        )
    );
};
