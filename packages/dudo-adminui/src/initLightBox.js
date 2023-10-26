import 'admin-lte/plugins/ekko-lightbox/ekko-lightbox.min.js'
import 'admin-lte/plugins/ekko-lightbox/ekko-lightbox.css'

export default () => {
  $(document.body).on('click', '[data-toggle="lightbox"]', function (e) {
    e.preventDefault()

    $(this).ekkoLightbox({
      alwaysShowClose: true,
    })
  })
};
