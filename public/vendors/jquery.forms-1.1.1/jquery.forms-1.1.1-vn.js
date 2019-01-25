/**
 *
 * jquery.forms.js
 * @version: 1.1.1
 * @depends: common.js, moment.js
 *
 * Configuration:
 * @param {String} [postUrl=null] Url which will post form data to. If null, will use 'action' attribute of form
 * @param {Function} validate Custom validation method. Arguments are 'form' and 'config'. 'form' is jQuery object form and 'config' is configuration of current form. Can return 'boolean' for result of validation or return object contains total error, list of error fields and list of error messages with format '{{error: Number, errorFields: Array, errorMessages: Array}}'
 * @param {Function} onValid Callback will be called when all fields are valid. Arguments are 'form' and 'config'. 'form' is jQuery object form and 'config' is configuration of current form
 * @param {Function} onInvalid Callback will be called when all fields are invalid. Arguments are 'form' and 'config'. 'form' is jQuery object form and 'config' is configuration of current form
 * @param {Boolean} [allowPostForm=true] Allow post form data via AJAX automatically or not
 * @param {Function} beforePostForm Callback will be called before posting form data to server. Arguments are 'form', 'config', 'data'. 'form' is jQuery object form, 'config' is configuration of current form and 'data' is form data. This callback MUST return the data for posting to server
 * @param {Function} onSuccess Callback will be called when post data form to server successfully. Arguments are 'resp', 'form' and 'config'. 'resp' is response data from server, 'form' is jQuery object form and 'config' is configuration of current form
 * @param {Function} onError Callback will be called when post data form to server failed. Arguments are 'resp', 'form' and 'config'. 'resp' is response data from server, 'form' is jQuery object form and 'config' is configuration of current form
 * @param {String} [confirmMessage=null] The confirmation message after posting data fom to server successfully
 * @param {Number} [confirmMessageDuration=5000] The displaying time of confirm message before it's hidden
 * @param {String|Function} validationMessageSelector Selector of validation message. It's can be function which will return jQuery object of validation message
 * @param {String} networkErrorMessage The error network message
 * @param {String} emailErrorMessage The error message when email fields are invalid
 * @param {String} requiredErrorMessage The error message when required fields are invalid
 * @param {String} dateErrorMessage The error message when date fields are invalid
 * @param {String} passwordErrorMessage The error message when password fields are invalid
 * @param {String} confirmPasswordErrorMessage The error message when confirmPassword fields are invalid
 * @param {String} simpleCharsErrorMessage The error message when simpleChars fields are invalid
 * @param {String} numericErrorMessage The error message when numeric fields are invalid
 * @param {String} hrefErrorMessage The error message when url fields are invalid
 * @param {Number} [animationDuration=300] The speed of all animations in jquery.forms
 * @param {Function} renderMessageWrapper The render method for message wrapper in jquery.forms. Arguments are 'messageContent' and 'type'. 'messageContent' is message content. 'type' can be 'danger', 'success', 'info' and 'warning'.
 * @param {Function} renderErrorMessage The render method for error messages in jquery.forms. Arguments are 'message'. 'message' is message content, can be string or array.
 */

(function ($) {
    $.fn.forms = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('[jquery.forms] Method ' + method + ' does not exist on jquery.forms');
        }
    };

    // Version for jquery.forms
    $.fn.forms.version = '1.1.1';

    // Default configuration
    $.fn.forms.DEFAULT = {
        postUrl: null, // means to use the form action as url
        validate: function (form, config) {
            flog('[jquery.forms] Default validate of v1.1.1', form, config);

            return {
                error: 0,
                errorFields: [],
                errorMessages: []
            }
        },
        onValid: function (form, config) {
            flog('[jquery.forms] Default onValid of v1.1.1', form, config);
        },
        onInvalid: function (form, config) {
            flog('[jquery.forms] Default onInvalid of v1.1.1', form, config);
        },
        allowPostForm: true,
        beforePostForm: function (form, config, data) {
            flog('[jquery.forms] Default beforePostForm of v1.1.1', form, config, data);

            return data;
        },
        onSuccess: function (resp, form, config) {
            flog('[jquery.forms] Default onSuccess of v1.1.1', resp, form, config);
        },
        onError: function (resp, form, config) {
            try {
                flog('[jquery.forms] Status indicates failure', resp);

                if (resp) {
                    var errorObj = $.isPlainObject(resp) ? resp : JSON.parse(resp.responseText);

                    if (errorObj.message) {
                        showErrorMessage(form, config, errorObj.message);
                    } else {
                        if (!errorObj.fieldMessages || errorObj.fieldMessages.length === 0) {
                            showErrorMessage(form, config, 'Rất tiếc, chúng tôi không thể xử lý yêu cầu của bạn');
                        }
                    }

                    flog('Error obj', errorObj);

                    showFieldMessages(errorObj.errors, form, config);
                } else {
                    showErrorMessage(form, config, 'Rất tiếc, chúng tôi không thể xử lý yêu cầu của bạn');
                }
            } catch (e) {
                flog('[jquery.forms] Error!', e);

                if (config.networkErrorMessage) {
                    showErrorMessage(form, config, config.networkErrorMessage);
                }
            }
        },
        confirmMessage: null,
        confirmMessageDuration: 5000,
        validationMessageSelector: '.form-message',
        networkErrorMessage: 'Rất tiếc, có thể đã có lỗi xảy ra với kết nối hoặc máy chủ. Xin vui lòng kiểm tra lại đường truyển internet của bạn. Nếu đường truyền internet của bạn không có trục trặc gì thì rất có thể là một trục trặc trong hệ thống.',
        emailErrorMessage: 'Xin vui lòng nhập địa chỉ email hợp lệ của bạn. Định dạng email nên là ben@somewhere.com',
        requiredErrorMessage: 'Xin vui lòng nhập những trường yêu cầu',
        dateErrorMessage: 'Xin vui lòng nhập ngày tháng hợp lệ',
        passwordErrorMessage: 'Mật khẩu của bạn tối thiếu phải có 6 ký tự bao gồm chữ số và chữ cái',
        confirmPasswordErrorMessage: 'Xin vui lòng nhập lại mật khẩu',
        simpleCharsErrorMessage: 'Xin vui lòng nhập mỗi chữ cái, chữ số, gạch chân, gạch ngang và dấu cách',
        reallySimpleCharsErrorMessage: 'Xin vui lòng nhập mỗi chữ cái và chữ số',
        numberErrorMessage: 'Xin vui lòng nhập chữ số',
        hrefErrorMessage: 'Xin vui lòng nhập địa chỉ web hợp lệ',
        animationDuration: 150,
        renderMessageWrapper: function (messageContent, type) {
            return '<div class="form-message alert alert-' + type + '" style="display: none"><a class="close" data-dismiss="alert">&times;</a>' + messageContent + '</div>';
        },
        renderErrorMessage: function (message) {
            if (typeof message === 'string') {
                message = [message];
            }

            var htmlMessages = '';
            for (var i = 0; i < message.length; i++) {
                htmlMessages += '<li>' + message[i] + '</li>';
            }

            return '<ul class="error-message">' + htmlMessages + '</ul>';
        }
    };

    var methods = {
        init: function (options) {
            return $(this).each(function () {
                var form = $(this);
                var config = $.extend({}, $.fn.forms.DEFAULT, options);
                flog('[jquery.forms] Configuration:', config);

                // ==============================================================================
                // Start of DEPRECATED migration
                // ==============================================================================
                if (typeof config.callback === 'function') {
                    config.onSuccess = config.callback;
                }

                if (typeof config.error === 'function') {
                    config.onInvalid = config.error;
                }

                if (typeof config.errorHandler === 'function') {
                    config.onError = config.errorHandler;
                }

                if (typeof config.valiationMessageSelector === 'string') {
                    config.validationMessageSelector = config.valiationMessageSelector;
                }
                // ==============================================================================
                // End of DEPRECATED migration
                // ==============================================================================

                if (form.data('formOptions')) {
                    flog('[jquery.forms] Is ready initialized');
                    return;
                } else {
                    // Add config to 'formOptions' data
                    form.data('formOptions', config);
                }

                flog('[jquery.forms] Initializing forms plugin...', form);

                form.off('submit').on('submit', function (e) {
                    e.preventDefault();

                    flog('[jquery.forms] On form submit', form, e);
                    resetValidation(form, config);

                    form.find('input[type=text]').each(function () {
                        var input = $(this);
                        var val = input.val().trim();

                        input.val(val);
                    });

                    form.find('textarea.ckeditor').each(function () {
                        var textarea = $(this);
                        var instanceName = textarea.attr('id') || textarea.attr('name');

                        textarea.val(CKEDITOR.instances[instanceName].getData());
                    });

                    var isValid = validateFormFields(form, config);
                    flog('[jquery.forms] Form is valid: ' + isValid);

                    if (isValid) {
                        if (typeof config.onValid === 'function') {
                            config.onValid.call(this, form, config);
                        }

                        if (config.allowPostForm === true) {
                            doPostForm(form, config, e);
                        }
                    } else {
                        var alertMsg = getValidationMessage(form, config);
                        if (alertMsg.length > 0) {
                            $('body, html').animate({
                                scrollTop: alertMsg.offset().top - 140
                            }, config.animationDuration);
                        }

                        if (typeof config.onInvalid === 'function') {
                            config.onInvalid.call(this, form, config);
                        }
                    }
                });

                form.off('reset').on('reset', function (e) {
                    form.find('textarea.ckeditor').each(function () {
                        var textarea = $(this);
                        var instanceName = textarea.attr('id') || textarea.attr('name');

                        textarea.val('');
                        CKEDITOR.instances[instanceName].setData('')
                    });

                    form.find('.image-selector-preview').attr('src', '');
                    form.find('.image-selector-input').val('');
                });
            });
        },
        getOptions: function () {
            return $(this).data('formOptions');
        },
        disable: function (callback) {
            return $(this).each(function () {
                var form = $(this);
                form.find('input, button, select, textarea').prop('readonly', true);

                if (typeof callback === 'function') {
                    callback.call(this, form);
                }
            });
        },
        enable: function (callback) {
            return $(this).each(function () {
                var form = $(this);
                form.find('input, button, select, textarea').prop('readonly', false);

                if (typeof callback === 'function') {
                    callback.call(this, form);
                }
            });
        },
        showElement: function (element, options, callback) {
            return $(this).each(function () {
                var form = $(this);
                var config = getFormConfig(form, form.forms('getOptions'));
                options = $.extend({}, {
                    'opacity': 1,
                    'height': 'show'
                }, options);

                element.stop().animate(options, config.animationDuration, callback);
            });
        },
        hideElement: function (element, options, callback) {
            return $(this).each(function () {
                var form = $(this);
                var config = getFormConfig(form, form.forms('getOptions'));
                options = $.extend({}, {
                    'opacity': 0,
                    'height': 'hide'
                }, options);

                element.stop().animate(options, config.animationDuration, callback);
            });
        }
    };

})(jQuery);

/**
 * Get configuration of form. The input configuration will be merged with default configuration of jquery.forms
 * @param {jQuery} form
 * @param {Object} config
 * @returns {Object}
 */
function getFormConfig(form, config) {
    var currentConfig = {};
    if (form && form.jquery && form.length > 0) {
        currentConfig = form.data('formOptions') || {};
    }

    if (!config) {
        config = {};
    }

    return $.extend({}, $.fn.forms.DEFAULT, currentConfig, config);
}

/**
 * Get validation message
 * @param {jQuery} form
 * @param {Object} config
 * @returns {jQuery}
 */
function getValidationMessage(form, config) {
    config = getFormConfig(form, config);

    if (config && config.validationMessageSelector) {
        if (typeof config.validationMessageSelector === 'string') {
            return form.find(config.validationMessageSelector);
        } else if (typeof config.validationMessageSelector === 'object' && config.validationMessageSelector.jquery) {
            return config.validationMessageSelector;
        } else {
            return $('');
        }
    } else {
        return $('');
    }
}

/**
 * Post all form data to Kademi server
 * @param {jQuery} form
 * @param {Object} config
 * @param {Object} event - optional, the event which caused the submit
 */
function doPostForm(form, config, event) {
    config = getFormConfig(form, config);

    // Trim all inputs
    var enc = form.attr('enctype');
    flog('[jquery.forms] Preparing doPostForm...', 'enctype: ' + enc, form);

    var data;
    if (enc == 'multipart/form-data') {
        data = form.serializeWithFiles();
    } else {
        data = form.serialize();
    }
    flog('[jquery.forms] Data:', data);

    if (typeof config.beforePostForm === 'function') {
        data = config.beforePostForm.call(this, form, config, data);
    }

    var url = form.attr('action');
    if (config.postUrl) {
        flog('[jquery.forms] Use supplied postUrl instead of form action', config.postUrl);
        url = config.postUrl;
    }
    if (!url) {
        flog('[jquery.forms] Url is empty. Will use "window.location.pathname" for posting');
        url = window.location.pathname;
    }

    flog('[jquery.forms] doPostForm', form, data, url);

    try {
        form.forms('disable');
        form.addClass('ajax-processing');

        var ajaxOpts = {
            type: 'POST',
            url: url,
            data: data,
            dataType: 'JSON',
            success: function (resp) {
                form.forms('enable');
                form.removeClass('ajax-processing');

                if (resp && resp.status) {
                    flog('[jquery.forms] Post form successfully', resp);

                    if (config.confirmMessage) {
                        showConfirmMessage(form, config);
                    }

                    if (typeof config.onSuccess === 'function') {
                        config.onSuccess.call(this, resp, form, config, event);
                    }
                } else {
                    flog('[jquery.forms] Posting form failed', resp);

                    if (typeof config.onError === 'function') {
                        config.onError.call(this, resp, form, config);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                form.forms('enable');
                form.removeClass('ajax-processing');

                flog('[jquery.forms] Error on posting form', form, jqXHR, textStatus, errorThrown);

                if (typeof config.onError === 'function') {
                    config.onError.call(this, jqXHR, form, config);
                }

                //if (config.networkErrorMessage) {
                //    showErrorMessage(form, config, config.networkErrorMessage + ' - ' + textStatus);
                //}
            }
        };
        if (enc == 'multipart/form-data') {
            ajaxOpts.processData = false;
            ajaxOpts.contentType = false;
        }
        ajaxOpts.beforeSend = function (xhr, options) { // et toc !
            options.data = data;

            /**
             * You can use https://github.com/francois2metz/html5-formdata for a fake FormData object
             * Only work with Firefox 3.6
             */
            if (data.fake) {
                xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + data.boundary);
                // with fake FormData object, we must use sendAsBinary
                xhr.send = function (data) {
                    xhr.sendAsBinary(data.toString());
                }
            }
        };

        $.ajax(ajaxOpts);
    } catch (e) {
        if (typeof config.onError === 'function') {
            config.onError.call(this, null, form, config);
        } else {
            flog('exception submitting form', e);
            alert('Rất tiếc, đã phát sinh lỗi khi gửi dữ liệu. Xin vui lòng liên hệ quản trị viên của website để giải quyết sự cố!');
        }
    }
}

/**
 * Show form message with specified type
 * @param {jQuery} form
 * @param {Object} config
 * @param {String} message
 * @param {String} title
 * @param {String} type
 * @param {Function} callback
 */
function showFormMessage(form, config, message, title, type, callback) {
    config = getFormConfig(form, config);

    var alertMsg = getValidationMessage(form, config);
    if (alertMsg.length === 0) {
        alertMsg = $(config.renderMessageWrapper(message, type));
        form.prepend(alertMsg);
    } else {
        alertMsg.append(message);
        alertMsg.attr('class', 'form-message alert alert-' + type);
    }

    if (title && title.length > 0) {
        var messageTitle = alertMsg.find('.form-message-title');
        if (messageTitle.length === 0) {
            var btnClose = alertMsg.find('.close');
            var titleHtml = '<p class="form-message-title"><b>' + title + '</b></p>';
            if (btnClose.length === 0) {
                alertMsg.prepend(titleHtml);
            } else {
                btnClose.after(titleHtml);
            }
        } else {
            messageTitle.html('<b>' + title + '</b');
        }
    }

    if (alertMsg.is(':hidden')) {
        form.forms('showElement', alertMsg);
    }

    if (typeof callback === 'function') {
        callback.call(this, form, config, message, type);
    }
}

/**
 * Show error message
 * @param {jQuery} form
 * @param {Object} config
 * @param {String|Array} message
 */
function showErrorMessage(form, config, message) {
    config = getFormConfig(form, config);

    var messageHtml = config.renderErrorMessage(message);

    showFormMessage(form, config, messageHtml, 'Lỗi', 'danger', null);
}

/**
 * Show confirmation message after post form successfully
 * @param {jQuery} form
 * @param {Object} config
 */
function showConfirmMessage(form, config) {
    config = getFormConfig(form, config);

    showFormMessage(form, config, config.confirmMessage, null, 'success', function () {
        window.setTimeout(function () {
            var alertMsg = getValidationMessage(form, config);
            form.forms('hideElement', alertMsg)
        }, config.confirmMessageDuration);
    });
}

/**
 * Show error fields with messages
 * @param {Array} fieldMessages
 * @param {jQuery} form
 */
function showFieldMessages(fieldMessages, form, config) {
    $.each(fieldMessages, function (field, message) {
        flog('[jquery.forms] Show field message', message);

        var target = form.find('#' + field);
        var msg = message.message;
        if (!target.length) {
            flog('trying to find target by name', target, field);
            target = form.find('[name=' + field + ']');
        }
        var parent = target.parent();
        var label = target.prev();

        if (msg.indexOf('unique') !== -1) {
            if (label.length > 0) {
                msg = label.text().trim() + ' đã tồn tại';
            } else {
                msg = target.attr('placeholder').trim() + ' đã tồn tại';
            }
        }

        //var errorMessage = parent.find('.help-block.error-message');
        //if (errorMessage.length > 0) {
        //    errorMessage.html(msg);
        //} else {
        //    parent.append(
        //        '<p class="help-block error-message">' + msg + '</p>'
        //    );
        //}

        showErrorField(target);
        showErrorMessage(form, config, msg);
    });
}

/**
 * Clear all error messages and remove all error classes
 * @param {jQuery} form
 * @param {Object} config
 */
function resetValidation(form, config) {
    flog('[jquery.forms] resetValidation', form, config);

    config = getFormConfig(form, config);

    form.find('.form-group').removeClass('has-error');
    form.find('.error-field').removeClass('error-field').removeAttr('error-message');
    form.find('.error-message').remove();
    form.find('.form-message-title').remove();

    var alertMsg = getValidationMessage(form, config);
    if (alertMsg.length > 0) {
        alertMsg.css('display', 'none').html('<a class="close" data-dismiss="alert">&times;</a>');
    }
}

/**
 * Validate all form fields
 * @param {jQuery} form
 * @param {Object} config
 * @returns {Boolean}
 */
function validateFormFields(form, config) {
    flog('[jquery.forms] validateFormFields', form, config);

    config = getFormConfig(form, config);

    var resultRequired = checkRequiredFields(form, config);
    if (resultRequired.error > 0) {
        for (var i = 0; i < resultRequired.errorFields.length; i++) {
            showErrorField(resultRequired.errorFields[i]);
        }

        showErrorMessage(form, config, config.requiredErrorMessage);

        return false;
    } else {
        var error = 0;
        var errorFields = [];
        var errorMessages = [];

        var resultEmails = checkValidEmailAddress(form, config);
        if (resultEmails.error > 0) {
            error += resultEmails.error;
            errorFields = errorFields.concat(resultEmails.errorFields);
            errorMessages.push(config.emailErrorMessage);
        }

        var resultDates = checkDates(form, config);
        if (resultDates.error > 0) {
            error += resultDates.error;
            errorFields = errorFields.concat(resultDates.errorFields);
            errorMessages.push(config.dateErrorMessage);
        }

        var resultPasswords = checkValidPasswords(form, config);
        if (!resultPasswords.password || !resultPasswords.confirmPassword) {
            error++;
            errorFields = errorFields.concat(resultPasswords.errorFields);

            if (!resultPasswords.password) {
                errorMessages.push(config.passwordErrorMessage);
            } else if (!resultPasswords.confirmPassword) {
                errorMessages.push(config.confirmPasswordErrorMessage);
            }
        }

        var resultSimpleChars = checkSimpleChars(form, config);
        if (resultSimpleChars.error > 0) {
            error += resultSimpleChars.error;
            errorFields = errorFields.concat(resultSimpleChars.errorFields);
            errorMessages.push(config.simpleCharsErrorMessage);
        }

        var resultReallySimpleChars = checkReallySimpleChars(form, config);
        if (resultReallySimpleChars.error > 0) {
            error += resultReallySimpleChars.error;
            errorFields = errorFields.concat(resultReallySimpleChars.errorFields);
            errorMessages.push(config.reallySimpleCharsErrorMessage);
        }

        var resultHrefs = checkHrefs(form, config);
        if (resultHrefs.error > 0) {
            error += resultHrefs.error;
            errorFields = errorFields.concat(resultHrefs.errorFields);
            errorMessages.push(config.hrefErrorMessage);
        }

        var resultNumbers = checkNumbers(form, config);
        if (resultNumbers.error > 0) {
            error += resultNumbers.error;
            errorFields = errorFields.concat(resultNumbers.errorFields);
            errorMessages.push(config.numberErrorMessage);
        }

        var resultRegexes = checkRegexes(form);
        if (resultRegexes.error > 0) {
            error += resultRegexes.error;
            errorFields = errorFields.concat(resultRegexes.errorFields);
            errorMessages = errorMessages.concat(resultRegexes.errorMessages);
        }

        if (typeof config.validate === 'function') {
            var resultCustomValidate = config.validate.call(this, form, config);
            flog('[jquery.forms] Validate method return', resultCustomValidate);

            if (typeof resultCustomValidate === 'boolean') {
                if (!resultCustomValidate) {
                    error++;
                }
            } else {
                if (resultCustomValidate && resultCustomValidate.error) {
                    if (resultCustomValidate.error > 0) {
                        error += resultCustomValidate.error;

                        if ($.isArray(resultCustomValidate.errorFields)) {
                            errorFields = errorFields.concat(resultCustomValidate.errorFields);
                        }

                        if ($.isArray(resultCustomValidate.errorMessages)) {
                            errorMessages = errorMessages.concat(resultCustomValidate.errorMessages);
                        }
                    }
                }
            }
        }

        if (error > 0) {
            showErrorMessage(form, config, errorMessages);
            for (var i = 0; i < errorFields.length; i++) {
                showErrorField(errorFields[i]);
            }

            return false;
        } else {
            return true;
        }
    }
}

/**
 * Check required checkboxes
 * @param {jQuery} form
 * @param {Object} config
 * @returns {{error: Number, errorFields: Array}}
 */
function checkRequiredCheckboxes(form, config) {
    flog('[jquery.forms] checkRequiredCheckboxes', form, config);

    config = getFormConfig(form, config);

    var error = 0;
    var errorFields = [];

    form.find('input.required:checkbox').not(':checked').each(function () {
        var input = $(this);
        flog('[jquery.forms] Field is required', input);

        errorFields.push(input);
        error++;
        input.attr('error-message', config.requiredErrorMessage);
    });

    return {
        error: error,
        errorFields: errorFields
    };
}

/**
 * Check required radio buttons
 * @param {jQuery} form
 * @param {Object} config
 * @returns {{error: Number, errorFields: Array}}
 */
function checkRequiredRadios(form, config) {
    flog('[jquery.forms] checkRequiredRadios', form, config);

    config = getFormConfig(form, config);

    var error = 0;
    var errorFields = [];
    var radioNames = {};

    form.find('input.required:radio').each(function () {
        var input = $(this);
        var name = input.attr('name');

        if (!radioNames[name]) {
            radioNames[name] = input;
        }
    });

    for (var name in radioNames) {
        var radios = form.find('input[name=' + name + ']');
        flog('[jquery.forms] Radio name: ' + name, radios);

        var checked = radios.filter(':checked');
        flog('[jquery.forms] Radio checked:', checked);

        if (checked.length === 0) {
            flog('[jquery.forms] Fields are required', radios);
            errorFields.push(radios);
            error++;
            radios.attr('error-message', config.requiredErrorMessage);
        }
    }

    return {
        error: error,
        errorFields: errorFields
    };
}

/**
 * Check required fields
 * @param {jQuery} form
 * @param {Object} config
 * @returns {{error: Number, errorFields: Array}}
 */
function checkRequiredFields(form, config) {
    flog('[jquery.forms] checkRequiredFields', form, config);

    config = getFormConfig(form, config);

    var error = 0;
    var errorFields = [];

    var resultRadios = checkRequiredRadios(form, config);
    if (resultRadios.error > 0) {
        flog('[jquery.forms] checkRequiredRadios is false');
        errorFields = errorFields.concat(resultRadios.errorFields);
        error++;
    }

    var resultCheckboxes = checkRequiredCheckboxes(form, config);
    if (resultCheckboxes.error > 0) {
        flog('[jquery.forms] checkRequiredCheckboxes is false');
        errorFields = errorFields.concat(resultCheckboxes.errorFields);
        error++;
    }

    // Exclude tt-hint, that is a field created by the typeahead plugin which copies the required class
    form.find('.required').not('.tt-hint').each(function () {
        var input = $(this);
        var val = input.val() || '';

        var placeholder = input.attr('placeholder');
        // note that the watermark can make the value == title
        if (val.length === 0 || val === placeholder) {
            flog('[jquery.forms] Field is required', input);

            errorFields.push(input);
            error++;
            input.attr('error-message', config.requiredErrorMessage);
        }
    });

    return {
        error: error,
        errorFields: errorFields
    };
}

/**
 * Check regex fields
 * @param {jQuery} form
 * @returns {{error: Number, errorFields: Array, errorMessages: Array}}
 */
function checkRegexes(form) {
    flog('[jquery.forms] checkRegexes', form);

    var error = 0;
    var errorFields = [];
    var errorMessages = [];

    form.find('input.regex').each(function () {
        var input = $(this);
        var shouldCheck = shouldCheckValue(input);

        if (shouldCheck) {
            var val = input.val();
            var regexStr = input.attr('data-regex');
            var regex = new RegExp(regexStr);
            var message = input.attr('data-message');

            if (!regex.test(val)) {
                flog('[jquery.forms] Regex field is invalid: ' + regexStr, input);

                errorFields.push(input);
                if ($.inArray(message, errorMessages) === -1) {
                    errorMessages.push(message);
                }
                error++;
                input.attr('error-message', message);
            }
        }
    });

    return {
        error: error,
        errorFields: errorFields,
        errorMessages: errorMessages
    };
}

/**
 * Input should be check value or not?
 * @param {jQuery} input
 * @returns {Boolean}
 */
function shouldCheckValue(input) {
    var shouldCheck = false;
    var isRequired = input.hasClass('required');
    var isRequiredIf = input.hasClass('required-if');
    var isRequiredIfShown = input.hasClass('required-if-shown');
    var val = input.val().trim();

    if (isRequiredIf) {
        if (val.length > 0) {
            shouldCheck = true;
        }
    } else if (isRequiredIfShown) {
        var isShown = input.is(':visible');
        if (isShown) {
            shouldCheck = true;
        }
    } else if (isRequired) {
        shouldCheck = true;
    } else {
        shouldCheck = val.length > 0;
    }

    return shouldCheck;
}

/**
 * Check date input
 * @depends: common.js, moment.js
 * @param {jQuery} form
 * @param {Object} config
 * @returns {{error: Number, errorFields: Array}}
 */
function checkDates(form, config) {
    flog('[jquery.forms] checkDates', form, config);

    config = getFormConfig(form, config);

    var error = 0;
    var errorFields = [];

    form.find('input.date, input.datetime').each(function () {
        var input = $(this);
        var shouldCheck = shouldCheckValue(input);

        if (shouldCheck) {
            var val = input.val().trim();
            var valid = moment(val, ['DD-MM-YYYY', 'DD-MM-YYYY HH:mm'], true);

            if (val.length === 0 || !valid) {
                flog('[jquery.forms] Date field is invalid', input);

                errorFields.push(input);
                error++;
                input.attr('error-message', config.dateErrorMessage);
            }
        }
    });

    return {
        error: error,
        errorFields: errorFields
    };
}

/**
 * Check password fields
 * @param {jQuery} form
 * @param {Object} config
 * @returns {{password: Boolean, confirmPassword: Boolean, errorFields: Array}}
 */
function checkValidPasswords(form, config) {
    flog('[jquery.forms] checkValidPasswords', form, config);

    config = getFormConfig(form, config);

    var input = form.find('input#password, input.password');

    if (input.length > 0) {
        var value = input.val();

        if (value.length > 0) {
            var passed = true;
            if (!input.hasClass('allow-dodgy-password')) {
                passed = validatePassword(value, {
                    length: [6, Infinity],
                    alpha: 1,
                    numeric: 1,
                    badWords: [],
                    badSequenceLength: 6
                });
            }

            if (!passed) {
                flog('[jquery.forms] Password field is invalid');
                input.attr('error-message', config.passwordErrorMessage);

                return {
                    password: false,
                    confirmPassword: false,
                    errorFields: [input]
                };
            } else {
                return checkPasswordsMatch(form, config, input);
            }
        } else {
            return {
                password: true,
                confirmPassword: true,
                errorFields: []
            }
        }
    } else {
        return {
            password: true,
            confirmPassword: true,
            errorFields: []
        }
    }
}

/**
 * Check confirm password
 * @param {jQuery} form
 * @param {Object} config
 * @param {jQuery} passwordInputs
 * @returns {{password: Boolean, confirmPassword: Boolean, errorFields: Array}}
 */
function checkPasswordsMatch(form, config, passwordInputs) {
    flog('[jquery.forms] checkPasswordsMatch', form, config, passwordInputs);

    config = getFormConfig(form, config);

    var confirmPasswordInputs = form.find('input#confirmPassword, input.confirm-password');

    if (confirmPasswordInputs.length === 0) {
        flog('[jquery.forms] There is no confirmation password field');

        return {
            password: true,
            confirmPassword: true,
            errorFields: []
        };
    }

    var password = passwordInputs.val();
    var confirmPassword = confirmPasswordInputs.val();

    if (password !== confirmPassword) {
        flog('[jquery.forms] Confirm password is not matched');
        confirmPasswordInputs.attr('error-message', config.confirmPasswordErrorMessage);

        return {
            password: true,
            confirmPassword: false,
            errorFields: [
                confirmPasswordInputs
            ]
        };
    }

    return {
        password: true,
        confirmPassword: true,
        errorFields: []
    };
}

/**
 * Check email inputs which has id or class is 'email'
 * @depends: common.js, moment.js
 * @param {jQuery} form
 * @param {Object} config
 * @returns {{error: Number, errorFields: Array}}
 */
function checkValidEmailAddress(form, config) {
    flog('[jquery.forms] checkValidEmailAddress', form, config);

    config = getFormConfig(form, config);

    var error = 0;
    var errorFields = [];
    var pattern = /^(("[\w-\s]+")|([\w-'']+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,66}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

    form.find('#email, input.email').each(function () {
        var input = $(this);
        var shouldCheck = shouldCheckValue(input);

        if (shouldCheck) {
            var val = input.val();

            if (val.length === 0 || !pattern.test(val)) {
                flog('[jquery.forms] Email field is invalid', input);

                errorFields.push(input);
                error++;
                input.attr('error-message', config.emailErrorMessage);
            }
        }
    });

    return {
        error: error,
        errorFields: errorFields
    };
}

/**
 * Check simple characters fields
 * @param {jQuery} form
 * @param {Object} config
 * @returns {{error: Number, errorFields: Array}}
 */
function checkSimpleChars(form, config) {
    flog('[jquery.forms] checkSimpleChars', form, config);

    config = getFormConfig(form, config);

    var error = 0;
    var errorFields = [];

    form.find('.simpleChars, .simple-chars').each(function () {
        var input = $(this);
        var shouldCheck = shouldCheckValue(input);

        if (shouldCheck) {
            var val = input.val();

            if (val.length > 0 && !checkSimpleValue(val)) {
                flog('[jquery.forms] Simple chars field is invalid', input);

                errorFields.push(input);
                error++;
                input.attr('error-message', config.simpleCharsErrorMessage);
            }
        }
    });

    return {
        error: error,
        errorFields: errorFields
    };
}

/**
 * Check really simple characters fields
 * @param {jQuery} form
 * @param {Object} config
 * @returns {{error: Number, errorFields: Array}}
 */
function checkReallySimpleChars(form, config) {
    flog('[jquery.forms] checkReallySimpleChars', form, config);

    config = getFormConfig(form, config);

    var error = 0;
    var errorFields = [];

    form.find('.reallySimpleChars, .really-simple-chars').each(function () {
        var input = $(this);
        var shouldCheck = shouldCheckValue(input);

        if (shouldCheck) {
            var val = input.val();

            if (val.length > 0 && !checkReallySimpleValue(val)) {
                flog('[jquery.forms] Really simple chars field is invalid', input);

                errorFields.push(input);
                error++;
                input.attr('error-message', config.reallySimpleCharsErrorMessage);
            }
        }
    });

    return {
        error: error,
        errorFields: errorFields
    };
}

/**
 * Check value contains only simple characters or not. Simple characters are letters, numbers, underscores, spaces, dots and dashes
 * @param {*} val
 * @returns {Boolean}
 */
function checkSimpleValue(val) {
    var simpleCharsPattern = new RegExp("^[a-zA-Z0-9_\.\ -]+$");
    return simpleCharsPattern.test(val);
}

/**
 * Check value contains only really simple characters or not. Really simple characters are only letters and numbers
 * @param {*} val
 * @returns {Boolean}
 */
function checkReallySimpleValue(val) {
    var simpleCharsPattern = new RegExp("^[a-zA-Z0-9]+$");
    return simpleCharsPattern.test(val);
}

/**
 * Check number fields
 * @param {jQuery} form
 * @param {Object} config
 * @returns {{error: Number, errorFields: Array}}
 */
function checkNumbers(form, config) {
    flog('[jquery.forms] checkNumbers', form, config);

    config = getFormConfig(form, config);

    var error = 0;
    var errorFields = [];

    form.find('input.numeric').each(function () {
        var input = $(this);
        var shouldCheck = shouldCheckValue(input);

        if (shouldCheck) {
            var val = input.val();

            if (val.length > 0 && isNaN(val)) {
                flog('[jquery.forms] Numeric field is invalid', input);

                errorFields.push(input);
                error++;
                input.attr('error-message', config.numberErrorMessage);
            }
        }
    });

    return {
        error: error,
        errorFields: errorFields
    };
}

/**
 * Check hrefs fields
 * @param {jQuery} form
 * @param {Object} config
 * @returns {{error: Number, errorFields: Array}}
 */
function checkHrefs(form, config) {
    flog('[jquery.forms] checkHrefs', form, config);

    config = getFormConfig(form, config);

    var error = 0;
    var errorFields = [];
    var pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

    form.find('input.href').each(function () {
        var input = $(this);
        var shouldCheck = shouldCheckValue(input);

        if (shouldCheck) {
            var val = input.val();

            if (val.length > 0 && !pattern.test(val)) {
                flog('[jquery.forms] Href field is invalid', input);

                errorFields.push(input);
                error++;
                input.attr('error-message', config.hrefErrorMessage);
            }
        }
    });

    return {
        error: error,
        errorFields: errorFields
    };
}

/**
 * Show error field
 * @param {jQuery} target
 */
function showErrorField(target) {
    flog('[jquery.forms] showErrorField', target);

    target.each(function () {
        var currentTarget = $(this);
        currentTarget.addClass('error-field');
        currentTarget.closest('.form-group').addClass('has-error');
    });

    //if (typeof CKEDITOR !== 'undefined') {
    //    if (CKEDITOR) {
    //        var name = target.attr('name');
    //        if (!name) {
    //            name = target.attr('id');
    //        }
    //
    //        var editor = CKEDITOR.instances[name];
    //        flog('[jquery.forms] Check for CKEditor', name, editor);
    //
    //        if (editor) {
    //            flog('[jquery.forms] Add "error-field" class', editor.form);
    //            editor.form.addClass('error-field');
    //        }
    //    }
    //}
}

/**
 * Ensure that input value 'target' always is jQuery object
 * @param {String|jQuery} target
 * @param {jQuery} context
 */
function ensure$Object(target, context) {
    if (typeof target === 'string') {
        if (target.indexOf(',') == -1 && target.indexOf('#') == -1) {
            return $('#' + target);
        } else {
            return context.find(target);
        }
    } else {
        if (!target.jquery) {
            return $(target);
        }
    }
}

/**
 * Check value length of input
 * @param {String|jQuery} target
 * @param {Number} minLength
 * @param {Number} maxLength
 * @param {String} lbl
 * @param {jQuery} form
 * @param {Object} config
 * @returns {Boolean}
 */
function checkValueLength(target, minLength, maxLength, lbl, form, config) {
    flog('[jquery.forms] checkValueLength', target, minLength, maxLength, lbl, form, config);

    target = ensure$Object(target);
    if (!form) {
        form = target.closest('form');
    }

    if (target.length === 0) {
        return true;
    }

    var value = target.val();
    flog('[jquery.forms] Value length: ' + value.length);

    if (minLength && isNumber(minLength)) {
        flog('[jquery.forms] Check min length: ' + minLength);

        if (value.length < minLength) {
            showErrorMessage(form, config, lbl + ' must be at least ' + minLength + ' characters');
            showErrorField(target);

            return false;
        }
    }

    if (maxLength && isNumber(maxLength)) {
        flog('[jquery.forms] Check max length: ' + maxLength);

        if (value.length > maxLength) {
            showErrorMessage(form, config, lbl + ' must be no more then ' + minLength + ' characters');
            showErrorField(target);

            return false;
        }
    }

    return true;
}

/**
 * Check exact length of input
 * @param {String|jQuery} target
 * @param {String} length
 * @param {String} lbl
 * @param {jQuery} form
 * @param {Object} config
 * @returns {Boolean}
 */
function checkExactLength(target, length, lbl, form, config) {
    flog('[jquery.forms] checkExactLength', target, length, lbl, form, config);

    target = ensure$Object(target);
    if (!form) {
        form = target.closest('form');
    }

    var value = target.val();
    if (value.length != length) {
        if (!form) {
            form = target.closest('form');
        }

        showErrorMessage(form, config, lbl ? lbl + 'must be at ' + length + ' characters' : 'Must be at ' + length + ' characters');
        showErrorField(target);

        return false;
    }

    return true;
}

/**
 * Passes if one of the targets has a non-empty value
 * @param {String|jQuery} target1
 * @param {String|jQuery} target2
 * @param {String} message
 * @param {jQuery} form
 * @param {Object} config
 * @returns {Boolean}
 */
function checkOneOf(target1, target2, message, form, config) {
    flog('[jquery.forms] checkOneOf', target1, target2, message, form, config);

    target1 = ensure$Object(target1);
    target2 = ensure$Object(target2);
    if (!form) {
        form = target.closest('form');
    }

    if (target1.val() || target2.val()) {
        return true;
    } else {
        showErrorField(target1);
        showErrorMessage(form, config, message);

        return false
    }
}

/**
 * Passes if target's value is either empty or a number. Spaces etc are not allowed
 * @param {String|jQuery} target
 * @param {jQuery} form
 * @param {Object} config
 * @returns {Boolean}
 */
function checkNumeric(target, form, config) {
    flog('[jquery.forms] checkNumeric', target, form, config)

    target = ensure$Object(target);
    if (!form) {
        form = target.closest('form');
    }

    var value = target.val();
    if (value) {
        if (!isNumber(value)) {
            showErrorField(target);
            showErrorMessage(form, config, 'Please enter only numeric digits');

            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

/**
 *
 * @param {String|jQuery} target
 * @param {String} message
 * @param {jQuery} form
 * @param {Object} config
 * @returns {Boolean}
 */
function checkTrue(target, message, form, config) {
    flog('[jquery.forms] checkTrue', target, message, form, config)

    target = ensure$Object(target);
    if (!form) {
        form = target.closest('form');
    }

    var value = target.filter(':checked').val();
    if (value) {
        return true;
    } else {
        showErrorField(target);
        showErrorMessage(form, config, message);

        return false;
    }
}

/**
 * Check value of group radio button
 * @param {String} radioName
 * @param {jQuery} form
 * @param {Object} config
 * @returns {Boolean}
 */
function checkRadio(radioName, form, config) {
    flog('[jquery.forms] checkRadio', radioName, form, config);

    var radios = form.find('input:radio[name=' + radioName + ']');
    var checkedRadio = radios.filter(':checked');

    if (checkedRadio.length === 0) {
        showErrorField(radios);
        showErrorMessage(form, config, 'Please select a value for ' + radioName);

        return false;
    } else {
        return true;
    }
}

/*
 Password Validator 0.1
 (c) 2007 Steven Levithan <stevenlevithan.com>
 MIT License
 */

function validatePassword(pw, options) {
    // default options (allows any password)
    var o = {
        lower: 0,
        upper: 0,
        alpha: 0, /* lower + upper */
        numeric: 0,
        special: 0,
        length: [0, Infinity],
        custom: [/* regexes and/or functions */],
        badWords: [],
        badSequenceLength: 0,
        noQwertySequences: false,
        noSequential: false
    };

    for (var property in options) {
        o[property] = options[property];
    }

    var re = {
        lower: /[a-z]/g,
        upper: /[A-Z]/g,
        alpha: /[A-Z]/gi,
        numeric: /[0-9]/g,
        special: /[\W_]/g
    };
    var rule;
    var i;

    // enforce min/max length
    if (pw.length < o.length[0] || pw.length > o.length[1]) {
        return false;
    }

    // enforce lower/upper/alpha/numeric/special rules
    for (rule in re) {
        if ((pw.match(re[rule]) || []).length < o[rule]) {
            return false;
        }
    }

    // enforce word ban (case insensitive)
    for (i = 0; i < o.badWords.length; i++) {
        if (pw.toLowerCase().indexOf(o.badWords[i].toLowerCase()) > -1) {
            return false;
        }
    }

    // enforce the no sequential, identical characters rule
    if (o.noSequential && /([\S\s])\1/.test(pw)) {
        return false;
    }

    // enforce alphanumeric/qwerty sequence ban rules
    if (o.badSequenceLength) {
        var lower = 'abcdefghijklmnopqrstuvwxyz';
        var upper = lower.toUpperCase();
        var numbers = '0123456789';
        var qwerty = 'qwertyuiopasdfghjklzxcvbnm';
        var start = o.badSequenceLength - 1;
        var seq = '_' + pw.slice(0, start);

        for (i = start; i < pw.length; i++) {
            seq = seq.slice(1) + pw.charAt(i);
            if (
                lower.indexOf(seq) > -1 ||
                upper.indexOf(seq) > -1 ||
                numbers.indexOf(seq) > -1 ||
                (o.noQwertySequences && qwerty.indexOf(seq) > -1)
            ) {
                return false;
            }
        }
    }

    // enforce custom regex/function rules
    for (i = 0; i < o.custom.length; i++) {
        rule = o.custom[i];
        if (rule instanceof RegExp) {
            if (!rule.test(pw)) {
                return false;
            }
        } else if (rule instanceof Function) {
            if (!rule(pw)) {
                return false;
            }
        }
    }

    // great success!
    return true;
}

// http://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
(function ($) {
    $.fn.serializeWithFiles = function () {
        var form = $(this);

        flog('[jquery.forms] Initializing serializeWithFiles...', form);

        // ADD FILE TO PARAM AJAX
        var formData = new FormData()
        form.find('input[type=file]').each(function (index, input) {
            $.each(input.files, function (i, file) {
                formData.append(input.name, file);
            });
        });

        var params = form.serializeArray();
        $.each(params, function (i, val) {
            formData.append(val.name, val.value);
        });

        return formData;
    };

})(jQuery);

/**
 * Emulate FormData for some browsers
 * MIT License
 * (c) 2010 François de Metz
 */
(function (w) {
    if (w.FormData) {
        return;
    }

    function FormData() {
        this.fake = true;
        this.boundary = '--------FormData' + Math.random();
        this._fields = [];
    }

    FormData.prototype.append = function (key, value) {
        this._fields.push([key, value]);
    };

    FormData.prototype.toString = function () {
        var boundary = this.boundary;
        var body = '';
        this._fields.forEach(function (field) {
            body += '--' + boundary + '\r\n';
            // file upload
            if (field[1].name) {
                var file = field[1];
                body += 'Content-Disposition: form-data; name=\'' + field[0] + '\'; filename=\'' + file.name + '\'\r\n';
                body += 'Content-Type: ' + file.type + '\r\n\r\n';
                body += file.getAsBinary() + '\r\n';
            } else {
                body += 'Content-Disposition: form-data; name=\'' + field[0] + '\';\r\n\r\n';
                body += field[1] + '\r\n';
            }
        });
        body += '--' + boundary + '--';
        return body;
    };

    w.FormData = FormData;

})(window);
