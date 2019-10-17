module.exports = (app) => {
    require('./login.route')(
        app,
        require('./login.controller')(app)
    );    
};
