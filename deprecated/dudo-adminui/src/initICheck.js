import './initICheck.scss'

const initICheck = (target) => {
  const accent = target.attr('data-color') || $(document.body).attr('data-accent')
  let id = target.attr('id')

  target.wrap(`<div class="icheck-${accent} d-inline"></div>`)
  target.after(`<label for="${id}"></label>`)
}

export default () => {
  $('input[type=radio], input[type=checkbox]').not('.toggler').each(function () {
    initICheck($(this))
  })

  $(document.body).on('icheck:none', 'input[type=radio]:not(.toggler), input[type=checkbox]:not(.toggler)', function () {
    initICheck($(this))
  })
};
