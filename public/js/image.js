(function ($) {
    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/jpeg'});
    }

    var modalTemplate = '';
    modalTemplate += '<div class="modal">';
    modalTemplate += '  <div class="modal-dialog modal-lg">';
    modalTemplate += '      <div class="modal-content">';
    modalTemplate += '          <div class="modal-header">';
    modalTemplate += '              <button type="button" class="close crop-cancel" data-dismiss="modal" aria-label="Close">';
    modalTemplate += '              <span aria-hidden="true">&times;</span></button>';
    modalTemplate += '              <h4 class="modal-title">Crop Image</h4>';
    modalTemplate += '          </div>';
    modalTemplate += '          <div class="modal-body">';
    modalTemplate += '              <div class="image-container"></div>';
    modalTemplate += '          </div>';
    modalTemplate += '          <div class="modal-footer">';
    modalTemplate += '              <div class="pull-left">';
    modalTemplate += '                  <span data-width></span> x <span data-height></span>';
    modalTemplate += '              </div>';
    modalTemplate += '              <button type="button" class="btn btn-default crop-cancel" data-dismiss="modal">Close</button>';
    modalTemplate += '              <button type="button" class="btn btn-primary crop-upload">Crop & Upload</button>';
    modalTemplate += '          </div>';
    modalTemplate += '      </div>';
    modalTemplate += '  </div>';
    modalTemplate += '</div>';

    Dropzone.autoDiscover = false;

    var myDropzone = new Dropzone('#image-upload-widget', {
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

        var cachedFilename = file.name;
        myDropzone.removeFile(file);

        var $cropperModal = $(modalTemplate);
        var $uploadCrop = $cropperModal.find('.crop-upload');
        var $cancelCrop = $cropperModal.find('.crop-cancel');

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

        var $img = $('<img class="img-responsive" />');

        var reader = new FileReader();
        reader.onloadend = function () {
            $cropperModal.find('.image-container').html($img);
            $img.attr('src', reader.result);

            $img.cropper({
                preview: '.image-preview',
                viewMode: 3,
                aspectRatio: 2,
                movable: false,
                cropBoxResizable: true,
                crop: function (event) {
                    var $cropModal = $(this).parents('.modal');
                    var $cropBoxWidth = $cropModal.find('span[data-width]');
                    var $cropBoxHeight = $cropModal.find('span[data-height]');
                    var cbWidth = Math.round(event.detail.width);
                    var cbHeight = Math.round(event.detail.height);
                    $cropBoxWidth.attr('data-width', cbWidth).text('Width: ' + cbWidth);
                    $cropBoxHeight.attr('data-width', cbHeight).text('Height: ' + cbHeight);
                }
            });
        };

        reader.readAsDataURL(file);

        $uploadCrop.on('click', function () {
            var blob = $img.cropper('getCroppedCanvas').toDataURL();
            var newFile = dataURItoBlob(blob);
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

        var btn = $(this);
        var imageURL = btn.attr('href');

        if (window.opener) {
            window.opener.onSelectImage(imageURL);
        }
    });

    // trigger delete image
    $('#images-wrapper').on('click', '.btn-delete-image', function (e) {
        e.preventDefault();

        var $image = $(this).closest('.image');

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