import 'admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min';
import 'admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css';

const initPicker = (input, options) => {
    let isHidden = input.is(':hidden');
    let target = input;

    if (isHidden) {
        let isRequired = input.hasClass('required');
        let placeholder = $(`<input type="text" class="form-control ${isRequired ? 'required' : ''}" value="" />`);
        input.after(placeholder);
        target = placeholder;
        options.defaultDate = input.val();
    }


    target.datetimepicker(options);
    target.focus(() => target.datetimepicker('show'));
    target.blur(() => target.datetimepicker('hide'));

    if (isHidden) {
        target.on('change.datetimepicker', (e) => {
            input.val(e.date.unix() + '000');
        });
    }
};

export default () => {
    $('.date-picker').each(function () {
        initPicker($(this), {
            locale: LOCALE.LANG,
            format: 'L',
        });
    });

    $('.date-time-picker').each(function () {
        initPicker($(this), {
            locale: LOCALE.LANG,
        });
    });

    $('.time-picker').each(function () {
        initPicker($(this), {
            locale: LOCALE.LANG,
            format: 'LT',
        });
    });

    $(document.body).on('date-picker:none', '.date-picker', function () {
        initPicker($(this), {
            locale: LOCALE.LANG,
            format: 'L',
        });
    });

    $(document.body).on('date-time-picker:none', '.date-time-picker', function () {
        initPicker($(this), {
            locale: LOCALE.LANG,
        });
    });

    $(document.body).on('time-picker:none', '.time-picker', function () {
        initPicker($(this), {
            locale: LOCALE.LANG,
            format: 'LT',
        });
    });
};
