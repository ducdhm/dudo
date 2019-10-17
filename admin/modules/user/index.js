module.exports = (app) => {
    require('./user.route')(
        app,
        require('./user.controller')(app)
    );    
};
