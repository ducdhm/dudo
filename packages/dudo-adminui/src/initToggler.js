import 'admin-lte/plugins/bootstrap-switch/js/bootstrap-switch.min';

const initToggler = (target) => {
    target.bootstrapSwitch({
        labelWidth: 10,
        onColor: 'success',
    });
    target.bootstrapSwitch('state', target.prop('checked'));
};

export default () => {
    $('.toggler').each(function () {
        initToggler($(this));
    });

    $(document.body).on('toggler:none', '.toggler', function () {
        initToggler($(this));
    });
};
