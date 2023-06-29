import URI from 'urijs'

export default () => {
  let recordList = $('#record-list')

  if (recordList.length > 0) {
    recordList.on('click', '.btn-delete', function (e) {
      e.preventDefault()

      let btn = $(this)
      if (!btn.hasClass('btn-reload')) {
        btn.addClass('btn-reload')
        btn.attr('data-action-url', btn.attr('href'))
        btn.attr('data-message', LOCALE.RECORD_LIST__DELETE_MESSAGE)
        btn.attr('data-confirm', LOCALE.RECORD_LIST__DELETE_CONFIRM)
      }
    })

    let searchWrapper = $('#record-search')
    if (searchWrapper.length > 0) {
      let triggerType = searchWrapper.attr('data-search-trigger') || 'manual'
      let btnSearch = searchWrapper.find('.btn-search')
      let btnClear = searchWrapper.find('.btn-search-clear')
      let inputs = searchWrapper.find('input, select')
      let searchUrl = new URI(window.location.href)

      let doSearch = () => {
        let query = {}
        inputs.each(function () {
          let input = $(this)

          query[input.attr('name')] = input.val()
        })

        window.location = searchUrl.query(query).toString()
      }

      btnSearch.on('click', (e) => {
        e.preventDefault()

        doSearch()
      })

      btnClear.on('click', (e) => {
        e.preventDefault()

        window.location = searchUrl.query('').toString()
      })

      if (triggerType === 'auto') {
        inputs.on('change', function () {
          doSearch()
        })

        inputs.on('keydown', function (e) {
          // When ENTER is pressed
          if (e.keyCode === 13) {
            doSearch()
          }
        })
      }
    }
  }
};
