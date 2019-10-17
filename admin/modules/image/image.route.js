const auth = require('connect-ensure-login').ensureLoggedIn();

module.exports = (app, controller) => {
    app.get(
        '/image',
        auth,
        controller.getImages
    );
    
    app.post(
        '/image/upload',
        auth,
        controller.imageUpload
    );
    
    app.post(
        '/image/delete',
        auth,
        controller.imageDelete
    );
};
