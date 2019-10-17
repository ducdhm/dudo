module.exports = (app) => {
    require('./dashboard.route')(
        app,
        require('./dashboard.controller')(app)
    );    
};
