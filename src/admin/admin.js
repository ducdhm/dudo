(function ($, window) {
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
    
    var initFormDetails = function () {
        var form = $('.form-details');
        if (form.length > 0) {
            form.forms({
                onSuccess: function () {
                    Msg.success('Saved!');
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
                
                if (confirm('Are you sure you want to delete this record?')) {
                    var a = $(this);
                    
                    $.ajax({
                        url: a.attr('href'),
                        dataType: 'json',
                        type: 'post',
                        success: function () {
                            $('#box-list').reloadFragment({
                                whenComplete: function () {
                                    Msg.success('Deleted!');
                                }
                            });
                        },
                        error: function () {
                            Msg.error('Error!');
                        }
                    });
                }
            });
        }
    };
    
    var initDatePicker = function () {
        $('.date-picker').each(function () {
            var picker = $(this);
            picker.datetimepicker({
                locale: 'en',
                format: 'L'
            });
        });
    };
    
    var initDateTimerPicker = function () {
        $('.datetime-picker').each(function () {
            var picker = $(this);
            picker.datetimepicker({
                locale: 'en'
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
                    format: 'DD/MM/YYYY'
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
            CKEDITOR.config.language = 'en';
        }
        
        initICheck();
        initFormDetails();
        initTableList();
        initDatePicker();
        initDateRangePicker();
        initDateTimerPicker();
        initSelect2();
        initToggler();
    });
    
})(jQuery, window);

