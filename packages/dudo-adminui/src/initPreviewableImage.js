import './initPreviewableImage.scss'

const NO_PHOTO = '/public/admin/images/no_photo.png'
const initPreviewableImage = (target) => {
  let previewWidth = target.attr('data-preview-width')
  let wrapper = target.parent()
  let previewer = $('<img class="previewer img-fluid" />')

  wrapper.addClass('previewable-image-wrapper')
  target.wrap(`<p></p>`)
  wrapper.append(previewer)
  previewer.wrap(`<p class="previewer-wrapper img-thumbnail text-center" style="max-width: ${previewWidth || ''}px"></p>`)

  let previewerWrapper = previewer.parent()

  target.on('change', function () {
    let link = this.value || NO_PHOTO

    previewerWrapper.addClass('loading')
    if (link) {
      $('<img />').attr('src', link).on({
        load: function () {
          previewer.attr('src', link)
          previewerWrapper.removeClass('loading')
        },
        error: function () {
          previewer.attr('src', NO_PHOTO)
          previewerWrapper.removeClass('loading')
        },
      })
    } else {
      previewer.attr('src', NO_PHOTO)
      previewerWrapper.removeClass('loading')
    }
  }).trigger('change')
}

export default () => {
  $('.previewable-image').each(function () {
    initPreviewableImage($(this))
  })

  $(document.body).on('previewable-image:none', '.previewable-image', function () {
    initPreviewableImage($(this))
  })
};
