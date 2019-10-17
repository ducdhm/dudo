module.exports = (app) => {
    require('./catalog.route')(
        app,
        require('./catalog.controller')(app)
    );    
};
