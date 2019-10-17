module.exports = (app, controller) => {
    app.get(
        '/login',
        controller.checkLogin
    );
    
    app.post(
        '/login',

        controller.doLogin
    );
    
    app.get(
        '/logout', controller.doLogout
    );
};
