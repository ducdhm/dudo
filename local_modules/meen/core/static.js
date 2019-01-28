// Static folder
// --------------------------------
const express = require('express');
const resolvePath = require('../utils/resolvePath');
module.exports = (app) => {

    app.use(
        '/public',
        express.static(
            resolvePath('public')
        )
    );
};
