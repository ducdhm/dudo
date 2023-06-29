const initUploader = (input) => {
  let uploadUrl = input.attr('data-url')
  let maxSize = +input.attr('data-max-size')
  let maxSizeMessage = input.attr('data-max-size-message')
  let acceptedFiles = input.attr('data-accepted-files')
  let acceptedFilesMessage = input.attr('data-accepted-files-message')

  let wrapper = $(`
        <form method="post" action="${uploadUrl}" class="dropzone">
            <div class="fallback">
                <input type="file" name="${input.attr('name')}" />
            </div>
        </form>
    `)
  input.after(wrapper)
  input.css('display', 'none').prop('disabled', true)

  let uploader = new Dropzone(wrapper.get(0), {
    paramName: input.attr('name'),
    maxFilesize: maxSize,
    acceptedFiles: acceptedFiles,
    dictDefaultMessage: LOCALE.UPLOADER__DEFAULT_MESSAGE,
    dictFileTooBig: maxSizeMessage,
    dictInvalidFileType: acceptedFilesMessage,
    headers: {
      'x-dropzone': 'true',
    },
  })

  setTimeout(() => {
    input.trigger('uploader:init', [uploader, wrapper])
  }, 100)
}

export default () => {
  $('.dropzone-uploader').each(function () {
    let input = $(this)
    initUploader(input)
  })

  $(document.body).on('uploader:none', '.dropzone-uploader', function () {
    initUploader($(this))
  })
};
