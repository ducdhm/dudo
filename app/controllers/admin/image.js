const fs = require('fs');
const config = require('../../utils/config');
const errorHandlers = require('../../utils/errorHandlers');
const utils = require('../../utils');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, config.uploadPath.image);
    },
    filename: (req, file, next) => {
        next(null, utils.getUploadFileName(file.originalname));
    }
});

const upload = multer({storage});

exports.getImages = (req, res, next) => {
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

exports.imageUpload = [
    upload.single('file'),
    
    (req, res, next) => res.status(200).send(req.file)
];

exports.imageDelete = (req, res, next) => {
    fs.unlink(config.uploadPath.image + req.body.file, (error) => {
        if (error) {
            return errorHandlers.jsonError(error, next);
        }
        
        res.json({
            status: true
        });
    });
};
