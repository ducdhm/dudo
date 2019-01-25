const app = require('../../core/app');
const imageController = require('../../controllers/admin/image');
const auth = require('connect-ensure-login').ensureLoggedIn();

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
