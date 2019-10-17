module.exports = (app) => {
    require('./image.route')(
        app,
        require('./image.controller')(app)
    );    
};
