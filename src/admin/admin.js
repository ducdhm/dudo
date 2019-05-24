import './styles/admin.scss';

const _showErrorField = (form, field, message) => {
    let formGroup = field.closest('.form-group');
    
    field.addClass('is-invalid');
    formGroup.addClass('has-error');
    
    let errorMessageEl = formGroup.find('.nf-error-message');
    if (errorMessageEl.length === 0) {
        errorMessageEl = $(`<div class="nf-error-message text-danger form-text small" style="display: none;"></div>`);
        field.after(errorMessageEl);
    }
    
    errorMessageEl.html(message);
    form.niceform('showElement', errorMessageEl);
};

const setCustomDefaults = () => {
    swal.setDefaults({
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass: 'btn btn-light'
    });
    
    Msg.extraClass = 'alert-styled-left alert-dismissible';
    Msg.iconEnabled = false;
    
    NiceForm.DEFAULTS.showError = (form, errorFields, options) => {
        errorFields.forEach(function (field) {
            _showErrorField(form, field, field.attr('data-error-message'));
        });
    };
    
    NiceForm.DEFAULTS.onAjaxError = (jqXhr, form, options) => {
        if (jqXhr.responseJSON) {
            Msg.error(jqXhr.responseJSON.message || options.locale.unknownErrorMessage);
        
            jqXhr.responseJSON.errorFields && jqXhr.responseJSON.errorFields.forEach(function (error) {
                _showErrorField(form, form.find(`[name="${error.name}"]`), error.message);
            });
        } else {
            Msg.error(options.locale.unknownErrorMessage);
        }
    };
    
    NiceForm.DEFAULTS.onAjaxSuccess = (resp, form, options) => {
        Msg.success(resp.message || options.locale.successMessage);
    };
    
};

const initSidebar = () => {
    $('.sidebar-fixed .sidebar-content').length > 0 && new PerfectScrollbar('.sidebar-fixed .sidebar-content', {
        wheelSpeed: 2,
        wheelPropagation: true
    });
};

const initTableList = () => {
    const table = $('.table-list');
    if (table.length > 0) {
        table.on('click', '.btn-delete', function (e) {
            e.preventDefault();
            
            const a = $(this);
            
            swal({
                title: 'Are you sure?',
                text: 'Are you sure you want to delete this record?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                showLoaderOnConfirm: true,
                preConfirm: function () {
                    return new Promise(function (resolve) {
                        $.ajax({
                            url: a.attr('href'),
                            dataType: 'json',
                            type: 'post',
                            success: function () {
                                resolve();
                            },
                            error: function () {
                                Msg.error('Error!');
                            }
                        });
                    });
                },
                allowOutsideClick: false
            }).then(function (result) {
                result.value && $('#table-list-content').reloadFragment({
                    whenComplete: function () {
                        Msg.success('Deleted!');
                    }
                });
            });
        });
    }
};

const initFormDetails = function () {
    const form = $('.form-details');
    if (form.length > 0) {
        form.niceform({
            onSuccess: function () {
                Msg.success('Saved!');
            }
        });
        
        const trigger = $('[data-trigger=form-submit]');
        if (trigger.length > 0) {
            trigger.on('click', function (e) {
                e.preventDefault();
                
                form.trigger('submit');
            })
        }
    }
};

const initToggler = () => {
    $('.toggler').each(function () {
        new Switchery(this);
    });
};

$(() => {
    setCustomDefaults();
    initSidebar();
    initTableList();
    initFormDetails();
    initToggler();
});

// (function ($, window) {
//     Dropzone.autoDiscover = false;
//
//     var initICheck = function () {
//         var inputs = $('[type=checkbox], [type=radio]').not('.toggler');
//
//         if (inputs.length > 0) {
//             inputs.iCheck({
//                 checkboxClass: 'icheckbox_flat-green',
//                 radioClass: 'iradio_flat-green'
//             });
//         }
//     };
//
//     var initDatePicker = function () {
//         $('.date-picker').each(function () {
//             var picker = $(this);
//             picker.datetimepicker({
//                 locale: 'en',
//                 format: 'L'
//             });
//         });
//     };
//
//     var initDateTimerPicker = function () {
//         $('.datetime-picker').each(function () {
//             var picker = $(this);
//             picker.datetimepicker({
//                 locale: 'en'
//             });
//         });
//     };
//
//     var initDateRangePicker = function () {
//         $('.date-range-picker').each(function () {
//             var wrapper = $(this);
//             var txtStart = wrapper.find('[name=startDate]');
//             var startDate = txtStart.val() || null;
//             var txtEnd = wrapper.find('[name=endDate]');
//             var endDate = txtEnd.val() || null;
//             var placeholder = $('<input type="text" class="form-control required" />');
//
//             var options = {
//                 locale: {
//                     format: 'DD/MM/YYYY'
//                 }
//             };
//
//             if (startDate && endDate) {
//                 options.startDate = startDate;
//                 options.endDate = endDate;
//             }
//
//             wrapper.append(placeholder);
//             placeholder.daterangepicker(options, function (start, end, label) {
//                 txtStart.val(start.format('DD/MM/YYYY'));
//                 txtEnd.val(end.format('DD/MM/YYYY'));
//             });
//
//             if (!(startDate && endDate)) {
//                 placeholder.val('');
//             }
//         });
//     };
//
//     var initSelect2 = function () {
//         $('select').each(function () {
//             var select = $(this);
//             var isCustomContent = select.find('[data-html]').length > 0;
//
//             select.addClass('select2');
//             select.select2({
//                 escapeMarkup: function (markup) {
//                     return markup;
//                 },
//                 templateResult: function (data) {
//                     return isCustomContent ? data.element ? data.element.getAttribute('data-html') : data.text : data.text;
//                 },
//                 templateSelection: function (data) {
//                     return isCustomContent ? data.element.getAttribute('data-html') : data.text;
//                 }
//             });
//         });
//     };
//
