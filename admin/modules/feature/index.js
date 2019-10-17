module.exports = (app) => {
    require('./feature.route')(
        app,
        require('./feature.controller')(app)
    );    
};
