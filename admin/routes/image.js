const auth = require('connect-ensure-login').ensureLoggedIn();

module.exports = (app) => {
    const imageController = require('../controllers/image')(app);
    
    app.get(
        '/image',
        auth,
        imageController.getImages
    );
    
    app.post(
        '/image/upload',
        auth,
        imageController.imageUpload
    );
    
    app.post(
        '/image/delete',
        auth,
        imageController.imageDelete
    );
};
