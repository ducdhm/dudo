module.exports = (app) => {
    require('./intent.route')(
        app,
        require('./intent.controller')(app)
    );    
};
