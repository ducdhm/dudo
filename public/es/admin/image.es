(function ($) {
    function dataURItoBlob(dataURI) {
        let byteString = atob(dataURI.split(',')[1]);
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/jpeg'});
    }
    
    let modalTemplate = `
        <div class="modal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close crop-cancel" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Crop Image</h4>
                    </div>
                    <div class="modal-body">
                        <div class="image-container"></div>
                    </div>
                    <div class="modal-footer">
                        <div class="pull-left">
                            <span data-width></span> x <span data-height></span>
                        </div>
                        <button type="button" class="btn btn-default crop-cancel" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary crop-upload">Crop & Upload</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    Dropzone.autoDiscover = false;
    
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
        
        let $cropperModal = $(modalTemplate);
        let $uploadCrop = $cropperModal.find('.crop-upload');
        let $cancelCrop = $cropperModal.find('.crop-cancel');
        
        $cropperModal.modal({
            backdrop: 'static',
            keyboard: false
        });
        
        $cropperModal.on('show.bs.modal', function (e) {
            console.log('Fired');
            if ($(".modal-backdrop").length > 1) {
                $(".modal-backdrop").not(':first').remove();
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
                    let cbWidth = Math.round(event.detail.width);
                    let cbHeight = Math.round(event.detail.height);
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
        $('#images-wrapper').reloadFragment();
    });
    
    // trigger select image
    $('#images-wrapper').on('click', '.btn-select-image', function (e) {
        e.preventDefault();
        
        let btn = $(this);
        let imageURL = btn.attr('href');
        
        if (window.opener) {
            window.opener.onSelectImage(imageURL);
        }
    });
    
    // trigger delete image
    $('#images-wrapper').on('click', '.btn-delete-image', function (e) {
        e.preventDefault();
        
        let $image = $(this).closest('.image');
        
        if (confirm('Are you sure you want to delete this image?')) {
            $.ajax({
                url: '/image/delete',
                type: 'post',
                dataType: 'json',
                data: {
                    file: $image.attr('title')
                }
            }).done(function (data) {
                if (data && data.status) {
                    Msg.success('Deleted!');
                    $('#images-wrapper').reloadFragment();
                }
            })
        }
    });
    
})(jQuery);