import 'admin-lte/plugins/select2/js/select2.full.min';
import 'admin-lte/plugins/select2/css/select2.min.css';
import 'admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css';

const initSelect2 = (target) => {
    let isCustomContent = target.find('[data-html]').length > 0;
    let extraOption = window[target.attr('data-select2-option')] || {};

    target.addClass('select2');
    target.select2({
        width: '100%',
        theme: 'bootstrap4',
        escapeMarkup: function (markup) {
            return markup;
        },
        templateResult: function (data) {
            return isCustomContent ? data.element ? data.element.getAttribute('data-html') : data.text : data.text;
        },
        templateSelection: function (data) {
            return isCustomContent ? data.element.getAttribute('data-html') : data.text;
        },
        ...extraOption,
    });
};

export default () => {
    $('select:not(.no-select2)').each(function () {
        initSelect2($(this));
    });

    $(document.body).on('select2:none', 'select:not(.no-select2)', function () {
        initSelect2($(this));
    });
};
