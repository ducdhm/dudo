const initCKEditor = (target) => {
  let configName = target.attr('data-ckeditor-config')
  let config = window[configName] || {}

  let editor = CKEDITOR.replace(target.get(0), {
    height: target.attr('data-height'),
    ...config,
  })

  editor.on('instanceReady', function () {
    this.document.on('input', () => editor.updateElement())
  })

  target.addClass('ckeditor')
}

export default () => {
  if (typeof window.CKEDITOR !== 'undefined') {
    window.CKEDITOR.config.language = window.LOCALE.lang
  }

  $('.form-control-ckeditor').each(function () {
    initCKEditor($(this))
  })

  $(document.body).on('ckeditor:none', '.form-control-ckeditor', function () {
    initCKEditor($(this))
  })
};
