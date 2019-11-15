const fs = require('fs');
const multer = require('multer');
const {errorHandlers, getUploadFileName} = require('meen-utils');

module.exports = (app) => {
    const config = app.config;
    const storage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, config.uploadPath.image);
        },
        filename: (req, file, next) => {
            next(null, getUploadFileName(file.originalname));
        }
    });
    const upload = multer({storage});
    
    const imageController = {};
    imageController.getImages = async (req, res, next) => {
        try {
            let items = fs.readdirSync(config.uploadPath.image);
            items = items.map(item => {
                // let stat = fs.statSync(config.uploadPath.image + item);
                
                return item;
            });
    
            return res.render('image', {
                title: req.query.hasOwnProperty('iframe') ? 'Images list' : 'Manage images',
                files: items
            });
        } catch (error) {
            return next(error);
        }
    };
    
    imageController.imageUpload = [
        upload.single('file'),
        
        (req, res, next) => res.status(200).send(req.file)
    ];
    
    imageController.imageDelete = async (req, res, next) => {
        try {
            fs.unlinkSync(config.uploadPath.image + req.body.file);
    
            res.json({
                status: true
            });
        } catch (error) {
            return errorHandlers.jsonError(error, res);
        }
    };
    
    return imageController;
};
