const fs = require('fs');
const utils = require('meen/utils');
const multer = require('multer');
const errorHandlers = require('meen/utils/errorHandlers');

module.exports = (app) => {
    const config = app.config;
    const storage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, config.uploadPath.image);
        },
        filename: (req, file, next) => {
            next(null, utils.getUploadFileName(file.originalname));
        }
    });
    const upload = multer({storage});
    
    const imageController = {};
    imageController.getImages = (req, res, next) => {
        fs.readdir(config.uploadPath.image, (error, items) => {
            if (error) {
                return next(error);
            }
            
            return res.render('image', {
                title: req.query.hasOwnProperty('iframe') ? 'Images list' : 'Manage images',
                files: items
            });
        })
    };
    
    imageController.imageUpload = [
        upload.single('file'),
        
        (req, res, next) => res.status(200).send(req.file)
    ];
    
    imageController.imageDelete = (req, res, next) => {
        fs.unlink(config.uploadPath.image + req.body.file, (error) => {
            if (error) {
                return errorHandlers.jsonError(error, next);
            }
            
            res.json({
                status: true
            });
        });
    };
    
    return imageController;
};
