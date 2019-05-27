import './styles/image.scss';

const dataURItoBlob = (dataURI) => {
    let byteString = atob(dataURI.split(',')[1]);
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: 'image/jpeg'});
};

Dropzone.autoDiscover = false;
const initDropzone = () => {
    let myDropzone = new Dropzone('#image-upload-widget', {
        paramName: 'file',
        maxFilesize: 3,
        acceptedFiles: 'image/*',
        autoProcessQueue: false,
        dictDefaultMessage: 'Drag &amp; drop or click to choose upload file',
        dictFileTooBig: 'Your file has exceeded {{maxFilesize}}MB',
        dictInvalidFileType: 'Your file is not image'
    });
    
    myDropzone.on('thumbnail', function (file) {
        if (file.cropped) {
            return;
        }
        
        let cachedFilename = file.name;
        myDropzone.removeFile(file);
        
        let $cropperModal = $('#modal-crop');
        let $uploadCrop = $cropperModal.find('.crop-upload');
        let $cancelCrop = $cropperModal.find('.crop-cancel');
        
        $cropperModal.modal({
            backdrop: 'static',
            keyboard: false
        });
        
        $cropperModal.on('show.bs.modal', function (e) {
            if ($('.modal-backdrop').length > 1) {
                $('.modal-backdrop').not(':first').remove();
            }
        }).modal('show');
        
        let $img = $('<img class="img-responsive" />');
        
        let reader = new FileReader();
        reader.onloadend = function () {
            $cropperModal.find('.image-container').html($img);
            $img.attr('src', reader.result);
            
            $img.cropper({
                preview: '.image-preview',
                viewMode: 3,
                aspectRatio: '',
                movable: false,
                cropBoxResizable: true,
                crop: function (event) {
                    let $cropModal = $(this).parents('.modal');
                    let $cropBoxWidth = $cropModal.find('span[data-width]');
                    let $cropBoxHeight = $cropModal.find('span[data-height]');
                    let cbWidth = Math.round(event.width);
                    let cbHeight = Math.round(event.height);
                    $cropBoxWidth.attr('data-width', cbWidth).text('Width: ' + cbWidth);
                    $cropBoxHeight.attr('data-width', cbHeight).text('Height: ' + cbHeight);
                }
            });
        };
        
        reader.readAsDataURL(file);
        
        $uploadCrop.on('click', function () {
            let blob = $img.cropper('getCroppedCanvas').toDataURL();
            let newFile = dataURItoBlob(blob);
            newFile.cropped = true;
            newFile.name = cachedFilename;
            
            myDropzone.addFile(newFile);
            myDropzone.processQueue();
            $cropperModal.modal('hide');
            $cropperModal.remove();
        });
        
        $cancelCrop.on('click', function () {
            $cropperModal.modal('hide');
            $cropperModal.remove();
        });
    });
    
    myDropzone.on('success', function (file) {
        this.removeFile(file);
        
        $('#images-wrapper').reloadFragment({
            whenComplete: () => {
                initFancyBox();
            }
        });
    });
};

const initImageActions = () => {
    const wrapper = $('#images-wrapper');
    
    wrapper.on('click', '.btn-select-image', function (e) {
        e.preventDefault();
        
        let btn = $(this);
        let imageURL = btn.attr('href');
        
        if (window.opener) {
            window.opener.onSelectImage(imageURL);
        }
    });
    
    wrapper.on('click', '.btn-delete-image', function (e) {
        e.preventDefault();
        
        let a = $(this);
    
        swal({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete this image?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            showLoaderOnConfirm: true,
            preConfirm: function () {
                return new Promise(function (resolve) {
                    $.ajax({
                        url: '/image/delete',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            file: a.attr('data-image')
                        }
                    }).done(function (data) {
                        if (data && data.status) {
                            resolve();
                        }
                    });
                });
            },
            allowOutsideClick: false
        }).then(function (result) {
            result.value && wrapper.reloadFragment({
                whenComplete: () => {
                    Msg.success('Deleted!');
                }
            });
        });
    });
};

const initFancyBox = () => {
    $('.btn-zoom-image').fancybox({
        padding: 3
    });
};

$(() => {
    initDropzone();
    initImageActions();
    initFancyBox();
});
