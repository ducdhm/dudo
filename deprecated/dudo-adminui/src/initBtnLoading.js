const setLoadingState = (btn, isLoading) => {
  btn.prop('disabled', isLoading)
  btn[isLoading ? 'addClass' : 'removeClass']('disabled')

  let i = btn.find('i')
  if (isLoading) {
    if (i.length > 0) {
      btn.attr('data-origin-icon', i.attr('class'))
      i.attr('class', 'fas fa-spinner fa-spin')
    } else {
      btn.prepend('<i class="fas fa-spinner fa-spin"></i>')
    }
  } else {
    let originIcon = btn.attr('data-origin-icon')
    if (originIcon) {
      i.attr('class', originIcon)
    } else {
      i.css('display', 'none')
    }
  }
}

export default () => {
  $(document.body).on('loading:loading', '.btn', function (e) {
    e.preventDefault()

    setLoadingState($(this), true)
  })

  $(document.body).on('loading:loaded', '.btn', function (e) {
    e.preventDefault()

    setLoadingState($(this), false)
  })
};
