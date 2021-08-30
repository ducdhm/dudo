const multer = require('multer');
const mime = require('mime-types')
const { getUploadFileName, newError } = require('@dudojs/utils');

const isValidFile = function (file, acceptedFiles, ignoreCheckMimeType) {
    if (!acceptedFiles || (Array.isArray(acceptedFiles) && acceptedFiles.length === 0)) {
        return true;
    }

    let mimeType = file.mimetype;
    let baseMimeType = mimeType.replace(/\/.*$/, '');

    if (!ignoreCheckMimeType) {
        // Verify fileName extension with mimetype
        let realMimeType = mime.lookup(file.originalname);
        if (realMimeType) {
            if (realMimeType !== mimeType) {
                return false;
            }
        }
    }

    for (let validType of acceptedFiles) {
        validType = validType.trim();
        if (validType.charAt(0) === '.') {
            if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
                return true;
            }
        } else if (/\/\*$/.test(validType)) {
            // This is something like a image/* mime type
            if (baseMimeType === validType.replace(/\/.*$/, '')) {
                return true;
            }
        } else {
            if (mimeType === validType) {
                return true;
            }
        }
    }

    return false;
};


module.exports = (app, options) => {
    let { LOCALE } = app;
    let acceptedFiles = options.acceptedFiles;
    let acceptedFileErrorMessage = options.acceptedFileErrorMessage;
    let fileSize = options.fileSize;
    let fileSizeErrorMessage = LOCALE.UPLOADER__SIZE_ERROR_MESSAGE.replace('{{MAX_FILE_SIZE}}', fileSize / 1024 / 1024);

    const storage = multer.diskStorage({
        destination: (req, file, next) => {
            let uploadPath = options.uploadPath;
            if (typeof options.uploadPath === 'function') {
                uploadPath = options.uploadPath(req, file);
            }

            next(null, uploadPath);
        },
        filename: (req, file, next) => {
            if (!mime.lookup(file.originalname)) {
                file.originalname += '.' + mime.extension(file.mimetype);
            }

            let fileName = getUploadFileName(file.originalname);

            if (options.fileName) {
                fileName = options.fileName;

                if (typeof options.fileName === 'function') {
                    fileName = options.fileName(req, file);
                }
            }

            next(null, fileName);
        },
    });

    const uploader = multer({
        storage,
        fileFilter: function (req, file, next) {
            if (isValidFile(file, acceptedFiles, options.ignoreCheckMimeType)) {
                return next(null, true);
            } else {
                return next(newError(422, acceptedFileErrorMessage));
            }
        },
        limits: {
            fileSize,
        },
    });

    const handleError = (error, next) => {
        error.message = error.code === 'LIMIT_FILE_SIZE' ? fileSizeErrorMessage : error.message;
        error.code = isNaN(error.code) ? 422 : error.code;
        return next(error);
    };

    return {
        single: (name) => (req, res, next) => {
            uploader.single(name)(req, res, function (error) {
                if (error) {
                    return handleError(error, next);
                }

                return next();
            });
        },
        array: (fieldName, maxCount) => (req, res, next) => {
            uploader.array(fieldName, maxCount)(req, res, function (error) {
                if (error) {
                    return handleError(error, next);
                }

                return next();
            });
        },
        fields: (fields) => (req, res, next) => {
            uploader.fields(fields)(req, res, function (error) {
                if (error) {
                    return handleError(error, next);
                }

                return next();
            });
        },
        none: () => (req, res, next) => {
            uploader.none()(req, res, function (error) {
                if (error) {
                    return handleError(error, next);
                }

                return next();
            });
        },
        any: () => (req, res, next) => {
            uploader.any()(req, res, function (error) {
                if (error) {
                    return handleError(error, next);
                }

                return next();
            });
        },
    };
};
