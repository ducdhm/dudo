module.exports = (app) => {
    require('./category.route')(
        app,
        require('./category.controller')(app)
    );    
};
