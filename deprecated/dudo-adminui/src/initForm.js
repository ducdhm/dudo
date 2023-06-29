import 'jquery.niceform/dist/jquery.niceform'

export default () => {
  $('.form-wrapper').each(function () {
    let wrapper = $(this)
    let form = wrapper.find('.form')
    let reloadTarget = form.attr('data-reload-target')
    const modal = form.closest('.modal')

    if (modal.length > 0) {
      modal.on('hidden.bs.modal', () => {
        form.trigger('reset')
        form.find('select').trigger('change')
      })
    }

    form.niceform({
      locale: {
        date: LOCALE.FORMAT__DATE,
        time: LOCALE.FORMAT__TIME,
        datetime: LOCALE.FORMAT__DATE_TIME,
        successTitle: LOCALE.NICEFORM__SUCCESS_TITLE,
        successMessage: LOCALE.NICEFORM__SUCCESS_MESSAGE,
        errorTitle: LOCALE.NICEFORM__ERROR_TITLE,
        invalidErrorMessage: LOCALE.NICEFORM__INVALID_ERROR_MESSAGE,
        requiredErrorMessage: LOCALE.NICEFORM__REQUIRED_ERROR_MESSAGE,
        dateErrorMessage: LOCALE.NICEFORM__DATE_ERROR_MESSAGE,
        timeErrorMessage: LOCALE.NICEFORM__TIME_ERROR_MESSAGE,
        datetimeErrorMessage: LOCALE.NICEFORM__DATETIME_ERROR_MESSAGE,
        emailErrorMessage: LOCALE.NICEFORM__EMAIL_ERROR_MESSAGE,
        numberErrorMessage: LOCALE.NICEFORM__NUMBER_ERROR_MESSAGE,
        urlErrorMessage: LOCALE.NICEFORM__URL_ERROR_MESSAGE,
        passwordErrorMessage: LOCALE.NICEFORM__PASSWORD_ERROR_MESSAGE,
        repasswordErrorMessage: LOCALE.NICEFORM__REPASSWORD_ERROR_MESSAGE,
        simpleErrorMessage: LOCALE.NICEFORM__SIMPLE_ERROR_MESSAGE,
        reallySimpleErrorMessage: LOCALE.NICEFORM__REALLYSIMPLE_ERROR_MESSAGE,
        unknownErrorMessage: LOCALE.NICEFORM__UNKNOWN_ERROR_MESSAGE,
      },
      onBeforeValidate: (form) => {
        form.find('.form-control-ckeditor').each(function () {
          let input = $(this)
          let id = input.attr('id')

          input.val(
            CKEDITOR.instances[id].getData(),
          )
        })
      },
      onAjaxSuccess: (resp) => {
        if (resp.data && resp.data.returnTo) {
          window.location.href = resp.data.returnTo
          return
        }

        let successMessage = resp.message || form.attr('data-success-message')
        if (form.hasClass('form-details')) {
          successMessage = successMessage || LOCALE.FORM__SUCCESS
        }

        if (reloadTarget) {
          $(reloadTarget).reload({
            onReloaded: function () {
              Msg.success(successMessage)
              modal.length > 0 && modal.modal('hide')
            },
          })
        } else {
          Msg.success(successMessage)
          modal.length > 0 && modal.modal('hide')
        }
      },
    })
  })

  $(document.body).on('reload:reloaded', '.form', function (e) {
    let form = $(this)
    form.find('input[type=radio]:not(.toggler), input[type=checkbox]:not(.toggler)').trigger('icheck:none')
    form.find('select:not(.no-select2)').trigger('select2:none')
    form.find('.form-control-ckeditor').trigger('ckeditor:none')
    form.find('.previewable-image').trigger('previewable-image:none')
    form.find('.file-picker').trigger('file-picker:none')
    form.find('.dropzone-uploader').trigger('uploader:none')
    form.find('.date-picker').trigger('date-picker:none')
    form.find('.date-time-picker').trigger('date-time-picker:none')
    form.find('.time-picker').trigger('time-picker:none')
    form.find('.date-range-picker').trigger('date-range-picker:none')
    form.find('.toggler').trigger('toggler:none')
  })

  $(document.body).on('click', '[data-trigger=form-submit]', function (e) {
    e.preventDefault()

    $(this).closest('.form-wrapper').find('.form').trigger('submit')
  })
};
