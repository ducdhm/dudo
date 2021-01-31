import Cropper from 'cropperjs/dist/cropper';
import 'cropperjs/dist/cropper.min.css';

const dataURItoBlob = (dataURI) => {
    let regex = /^data:(\w+[/][^/;]+);([^,]+),(.+)$/;
    let data = dataURI.match(regex);
    let byteString = atob(data[3]);

    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: data[1] });
};

const getModalCrop = () => {
    let randomId = (new Date()).getTime() + Math.round(Math.random() * 9876543210);
    let dataAccent = $(document.body).attr('data-accent');

    let modal = $(`
        <div class="modal modal-crop-image" id="modal-crop-image-${randomId}">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">
                            <i class="fas fa-crop-alt"></i>
                            ${LOCALE.IMAGE_UPLOADER__MODAL_TITLE}
                        </h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body" >
                        <div class="image-container" >
                            <img class="img-fluid" />
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <div class="pull-left">
                            <span data-width></span>
                            &nbsp;&ndash;&nbsp;
                            <span data-height></span>
                            &nbsp;&ndash;&nbsp;
                            <span data-zoom></span>
                        </div>
                        <div>
                            <button type="button" class="btn btn-default" data-dismiss="modal">
                                <i class="fas fa-times"></i>
                                ${LOCALE.IMAGE_UPLOADER__MODAL_BTN_CLOSE}
                            </button>
                            <button type="button" class="btn btn-${dataAccent} btn-upload">
                                <i class="fas fa-upload"></i>
                                ${LOCALE.IMAGE_UPLOADER__MODAL_BTN_UPLOAD}
                            </button>
                            <button type="button" class="btn btn-${dataAccent} btn-crop-upload">
                                <i class="fas fa-crop-alt"></i>
${LOCALE.IMAGE_UPLOADER__MODAL_BTN_UPLOAD_CROP}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
    modal.appendTo(document.body);

    return modal;
}

const initUploader = (wrapper, paramName) => {
    let cachedFilename;
    let modalCrop = getModalCrop();
    let imgCrop = modalCrop.find('.image-container img');
    let lblWidth = modalCrop.find('span[data-width]');
    let lblHeight = modalCrop.find('span[data-height]');
    let lblZoom = modalCrop.find('span[data-zoom]');

    // Cropper
    // -----------------------------------------------
    let cropper = new Cropper(imgCrop[0], {
        preview: '.image-preview',
        viewMode: 2,
        movable: false,
        cropBoxResizable: true,
        ready: function (e) {
            let imageData = cropper.getImageData();
            let zoomLevel = imageData.width / imageData.naturalWidth;

            lblZoom.html('<b><i class="fas fa-fw fa-search-plus"></i></b> ' + Math.round(zoomLevel * 100) + '%');
        },
        crop: function (event) {
            lblWidth.html('<b><i class="fas fa-fw fa-text-width"></i></b> ' + Math.round(event.detail.width) + 'px');
            lblHeight.html('<b><i class="fas fa-fw fa-text-height"></i></b> ' + Math.round(event.detail.height) + 'px');
        },
        zoom: function (e) {
            lblZoom.html('<b><i class="fas fa-fw fa-search-plus"></i></b> ' + Math.round(e.detail.ratio * 100) + '%');
        },
    });

    // Dropzone
    // -----------------------------------------------
    let uploader = new Dropzone(wrapper.get(0), {
        paramName,
        maxFilesize: 3,
        acceptedFiles: 'image/*',
        autoProcessQueue: false,
        dictDefaultMessage: LOCALE.UPLOADER__DEFAULT_MESSAGE,
        dictFileTooBig: LOCALE.UPLOADER__SIZE_ERROR_MESSAGE,
        dictInvalidFileType: LOCALE.IMAGE_UPLOADER__TYPE_ERROR_MESSAGE,
    });

    uploader.on('addedfile', function (file) {
        if (file.cropped) {
            return;
        }

        if (!Dropzone.isValidFile(file, uploader.options.acceptedFiles)) {
            Msg.error(LOCALE.IMAGE_UPLOADER__TYPE_ERROR_MESSAGE);
            uploader.removeFile(file);
            return;
        }

        cachedFilename = file.name;
        uploader.removeFile(file);

        let reader = new FileReader();
        reader.onloadend = function () {
            cropper.replace(reader.result);
            modalCrop.modal('show');
        };

        reader.readAsDataURL(file);
    });

    uploader.on('success', function (file) {
        uploader.removeFile(file);
        $('#images-wrapper').reload();
        modalCrop.modal('hide');
        Msg.success(LOCALE.IMAGE_UPLOADER__SUCCESS_MESSAGE);
    });

    uploader.on('error', function (file, resp) {
        uploader.removeFile(file);
        Msg.error(resp);
        modalCrop.modal('hide');
    });

    // Crop modal
    // -----------------------------------------------
    let btnCropAndUpload = modalCrop.find('.btn-crop-upload');
    let btnUpload = modalCrop.find('.btn-upload');

    modalCrop.modal({
        backdrop: 'static',
        keyboard: false,
        show: false,
    });

    modalCrop.on('show.bs.modal', function (e) {
        let backdrop = $('.modal-backdrop');

        if (backdrop.length > 1) {
            backdrop.not(':first').remove();
        }
    });

    btnCropAndUpload.on('click', function () {
        let blob = cropper.getCroppedCanvas().toDataURL();
        let newFile = dataURItoBlob(blob);
        let lastDotIndex = cachedFilename.lastIndexOf('.');
        let newFileName = cachedFilename.substring(0, lastDotIndex)
        newFile.name = `${newFileName}.png`;
        newFile.cropped = true;

        uploader.addFile(newFile);
        uploader.processQueue();
    });

    btnUpload.on('click', function () {
        let newFile = dataURItoBlob(imgCrop.attr('src'));
        newFile.name = cachedFilename;
        newFile.cropped = true;

        uploader.addFile(newFile);
        uploader.processQueue();
    });
};

export default () => {
    $('.image-uploader').each(function () {
        let input = $(this);
        let name = input.attr('name');
        let uploadUrl = input.attr('data-url');

        input.wrap(`<form method="post" action="${uploadUrl}" class="dropzone"><div class="fallback"></div></form>`);

        initUploader(input.closest('.dropzone'), name);
    });
};
