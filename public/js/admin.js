(function ($, window) {
    Msg.iconMode = 'fa';
    Dropzone.autoDiscover = false;
    
    var initICheck = function () {
        var inputs = $('[type=checkbox], [type=radio]').not('.toggler');
        
        if (inputs.length > 0) {
            inputs.iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });
        }
    };
    
    var renderPreviewer = function (previewer, fileName) {
        if (fileName) {
            previewer.html(`File đã tải: <a href="/public/uploads/cif/${fileName}" target="_blank">${fileName}</a>`);
        } else {
            previewer.html('File đã tải: <span class="text-muted">[Không]</span>');
        }
    };
    
    var initCustomerUploader = function (form) {
        var customerFile = form.find('#customerFile');
        
        if (customerFile.length > 0) {
            var txtRef = $('<input type="hidden" value="" name="refId" />');
            var previewer = $('<div></div>');
            var uploadWidget = $(
                '<div id="upload-widget">' +
                '    <form method="post" action="/uploadCIF" class="dropzone panel panel-default" enctype="multipart/form-data">' +
                '        <div class="fallback">' +
                '            <input name="file" type="file" />' +
                '        </div>' +
                '    </form>' +
                '</div>'
            );
            form.after(uploadWidget);
            uploadWidget.prepend(previewer);
            customerFile.after(txtRef);
            
            renderPreviewer(previewer, customerFile.val());
            
            initWidgetUpload(uploadWidget.find('form'), function (dropzone, file, resp) {
                dropzone.removeFile(file);
                txtRef.val(resp.data.refId);
                customerFile.val(resp.data.fileName);
                renderPreviewer(previewer, resp.data.fileName);
            });
        }
    };
    
    var initApproval = function () {
        var wrapper = $('.approve-wrapper');
        if (wrapper.length > 0) {
            wrapper.on('click', '.btn-approve', function (e) {
                e.preventDefault();
                
                var btn = $(this);
                var url = btn.attr('data-url');
                var text = btn.attr('data-action');
                
                if (confirm('Bạn có chắc bạn muốn ' + text + '?')) {
                    $.ajax({
                        url: url,
                        dataType: 'json',
                        type: 'post',
                        success: function (resp) {
                            if (resp && resp.status) {
                                wrapper.reloadFragment({
                                    url: location.href,
                                    whenComplete: function () {
                                        Msg.success(text + ' thành công!');
                                    }
                                });
                            } else {
                                Msg.error('Có lỗi xảy ra!');
                            }
                        },
                        error: function () {
                            Msg.error('Có lỗi xảy ra!');
                        }
                    })
                }
            });
        }
    };
    
    var initFormDetails = function () {
        var form = $('.form-details');
        if (form.length > 0) {
            initCustomerUploader(form);
            form.forms({
                onSuccess: function () {
                    Msg.success('Lưu thành công!');
                }
            });
            
            var trigger = $('[data-trigger=form-submit]');
            if (trigger.length > 0) {
                trigger.on('click', function (e) {
                    e.preventDefault();
                    
                    form.trigger('submit');
                })
            }
        }
    };
    
    var initTableList = function () {
        var table = $('.table-list');
        if (table.length > 0) {
            table.on('click', '.btn-delete', function (e) {
                e.preventDefault();
                
                if (confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
                    var a = $(this);
                    
                    $.ajax({
                        url: a.attr('href'),
                        dataType: 'json',
                        type: 'post',
                        success: function () {
                            // a.closest('tr').remove();
                            $('#box-list').reloadFragment({
                                whenComplete: function () {
                                    Msg.success('Xóa bản ghi thành công!');
                                }
                            });
                        },
                        error: function () {
                            Msg.error('Có lỗi xảy ra!');
                        }
                    });
                }
            });
        }
    };
    
    window.initCKEditor = function initCKEditor(target, onlyBold) {
        var toolbarGroups = [
            {name: 'document', groups: ['mode', 'document', 'doctools']},
            {name: 'clipboard', groups: ['clipboard', 'undo']},
            {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
            {name: 'forms', groups: ['forms']},
            '/',
            {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
            {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
            {name: 'links', groups: ['links']},
            {name: 'insert', groups: ['insert']},
            '/',
            {name: 'styles', groups: ['styles']},
            {name: 'colors', groups: ['colors']},
            {name: 'tools', groups: ['tools']},
            {name: 'others', groups: ['others']},
            {name: 'about', groups: ['about']}
        ];
        var removeButtons = 'Source,Save,Templates,NewPage,Preview,Print,Cut,Undo,Redo,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Replace,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Form,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Image,Flash,Table,HorizontalRule,SpecialChar,Smiley,PageBreak,Iframe,ShowBlocks,About';
        
        if (onlyBold) {
            toolbarGroups = [
                {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
                {name: 'tools', groups: ['tools']}
            ];
            
            removeButtons = 'Source,Save,Templates,NewPage,Preview,Print,Paste,Copy,Cut,Find,Undo,Replace,Redo,PasteText,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,About,ShowBlocks,BGColor,TextColor,Styles,Format,Font,FontSize,Iframe,PageBreak,SpecialChar,Smiley,HorizontalRule,Table,Flash,Image,Link,Unlink,Anchor,Language,JustifyRight,JustifyCenter,BidiRtl,BidiLtr,JustifyLeft,JustifyBlock,CreateDiv,Blockquote,Outdent,Indent,BulletedList,NumberedList,CopyFormatting,RemoveFormat,Italic,Underline,Strike,Subscript,Superscript,PasteFromWord';
        }
        
        CKEDITOR.replace(target.get(0), {
            toolbarGroups: toolbarGroups,
            removeButtons: removeButtons
        });
        target.addClass('ckeditor');
    };
    
    window.initWidgetUpload = function initWidgetUpload(target, onSuccess) {
        new Dropzone(target.get(0), {
            paramName: 'file',
            maxFilesize: 3, // MB
            maxFiles: 1,
            dictDefaultMessage: 'Kéo thả file hoặc click chọn file để tải lên',
            dictFileTooBig: 'File bạn vừa chọn có dung lượng vượt quá {{maxFilesize}}MB',
            dictInvalidFileType: 'File bạn vừa chọn không phải là file Excel',
            acceptedFiles: 'text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            init: function () {
            
            },
            success: function (file, resp) {
                if (resp && resp.status) {
                    typeof onSuccess === 'function' && onSuccess.call(null, this, file, resp);
                }
            }
        });
    };
    
    var initPreviewableImage = function () {
        $('.previewable-image').each(function () {
            var previewableImage = $(this);
            var wrapper = previewableImage.parent();
            var previewer = $('<img class="previewer" />');
            
            wrapper.addClass('previewable-image-wrapper');
            previewableImage.wrap('<p></p>');
            wrapper.append(previewer);
            previewer.wrap('<p class="previewer-wrapper thumbnail"></p>');
            
            var previewerWrapper = previewer.parent();
            
            previewableImage.on('change', function () {
                var link = this.value || '/public/img/no_photo.png';
                
                previewerWrapper.addClass('loading');
                if (link) {
                    $('<img />').attr('src', link).on({
                        load: function () {
                            previewer.attr('src', link);
                            previewerWrapper.removeClass('loading');
                        },
                        error: function () {
                            previewer.attr('src', '/public/img/no_photo.png');
                            previewerWrapper.removeClass('loading');
                        }
                    });
                } else {
                    previewer.attr('src', '/public/img/no_photo.png');
                    previewerWrapper.removeClass('loading');
                }
            }).trigger('change');
        });
    };
    
    var initDatePicker = function () {
        $('.date-picker').each(function () {
            var picker = $(this);
            picker.datetimepicker({
                locale: 'vi',
                format: 'L'
            });
        });
    };
    
    var initDateTimerPicker = function () {
        $('.datetime-picker').each(function () {
            var picker = $(this);
            picker.datetimepicker({
                locale: 'vi'
            });
        });
    };
    
    var initDateRangePicker = function () {
        $('.date-range-picker').each(function () {
            var wrapper = $(this);
            var txtStart = wrapper.find('[name=startDate]');
            var startDate = txtStart.val() || null;
            var txtEnd = wrapper.find('[name=endDate]');
            var endDate = txtEnd.val() || null;
            var placeholder = $('<input type="text" class="form-control required" />');
            
            var options = {
                locale: {
                    format: 'DD/MM/YYYY',
                    cancelLabel: 'Hủy',
                    applyLabel: 'Chọn',
                    daysOfWeek: [
                        'CN',
                        'T2',
                        'T3',
                        'T4',
                        'T5',
                        'T6',
                        'T7'
                    ],
                    monthNames: [
                        'Tháng 1 /',
                        'Tháng 2 /',
                        'Tháng 3 /',
                        'Tháng 4 /',
                        'Tháng 5 /',
                        'Tháng 6 /',
                        'Tháng 7 /',
                        'Tháng 8 /',
                        'Tháng 9 /',
                        'Tháng 10 /',
                        'Tháng 11 /',
                        'Tháng 12 /'
                    ],
                }
            };
            
            if (startDate && endDate) {
                options.startDate = startDate;
                options.endDate = endDate;
            }
            
            wrapper.append(placeholder);
            placeholder.daterangepicker(options, function (start, end, label) {
                txtStart.val(start.format('DD/MM/YYYY'));
                txtEnd.val(end.format('DD/MM/YYYY'));
            });
            
            if (!(startDate && endDate)) {
                placeholder.val('');
            }
        });
    };
    
    var initSelect2 = function () {
        $('select').each(function () {
            var select = $(this);
            var isCustomContent = select.find('[data-html]').length > 0;
            
            select.addClass('select2');
            select.select2({
                escapeMarkup: function (markup) {
                    return markup;
                },
                templateResult: function (data) {
                    return isCustomContent ? data.element ? data.element.getAttribute('data-html') : data.text : data.text;
                },
                templateSelection: function (data) {
                    return isCustomContent ? data.element.getAttribute('data-html') : data.text;
                }
            });
        });
    };
    
    var initToggler = function () {
        $('.toggler').each(function () {
            var toggler = $(this);
            
            toggler.bootstrapToggle({
                on: 'ON',
                off: 'OFF',
                onstyle: 'success',
                offstyle: 'default'
            });
        });
    };
    
    $(function () {
        if (typeof CKEDITOR !== 'undefined') {
            CKEDITOR.config.language = 'vi';
        }
        
        initApproval();
        initICheck();
        initFormDetails();
        initTableList();
        initPreviewableImage();
        initDatePicker();
        initDateRangePicker();
        initDateTimerPicker();
        initSelect2();
        initToggler();
    });
    
})(jQuery, window);

