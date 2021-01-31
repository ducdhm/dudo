import 'admin-lte/plugins/daterangepicker/daterangepicker';
import 'admin-lte/plugins/daterangepicker/daterangepicker.css';

const locale = {
    format: LOCALE.FORMAT__DATE,
    cancelLabel: LOCALE.DATE_RANGE_PICKER__CANCEL_TEST,
    applyLabel: LOCALE.DATE_RANGE_PICKER__APPLY_TEST,
    fromLabel: LOCALE.DATE_RANGE_PICKER__FROM,
    toLabel: LOCALE.DATE_RANGE_PICKER__TO,
    customRangeLabel: LOCALE.DATE_RANGE_PICKER__CUSTOM,
    weekLabel: 'W',
    daysOfWeek: [
        LOCALE.DATE_RANGE_PICKER__SUNDAY,
        LOCALE.DATE_RANGE_PICKER__MONDAY,
        LOCALE.DATE_RANGE_PICKER__TUESDAY,
        LOCALE.DATE_RANGE_PICKER__WEDNESDAY,
        LOCALE.DATE_RANGE_PICKER__THURSDAY,
        LOCALE.DATE_RANGE_PICKER__FRIDAY,
        LOCALE.DATE_RANGE_PICKER__SATURDAY,
    ],
    monthNames: [
        LOCALE.DATE_RANGE_PICKER__JANUARY,
        LOCALE.DATE_RANGE_PICKER__FEBRUARY,
        LOCALE.DATE_RANGE_PICKER__MARCH,
        LOCALE.DATE_RANGE_PICKER__APRIL,
        LOCALE.DATE_RANGE_PICKER__MAY,
        LOCALE.DATE_RANGE_PICKER__JUNE,
        LOCALE.DATE_RANGE_PICKER__JULY,
        LOCALE.DATE_RANGE_PICKER__AUGUST,
        LOCALE.DATE_RANGE_PICKER__SEPTEMBER,
        LOCALE.DATE_RANGE_PICKER__OCTOBER,
        LOCALE.DATE_RANGE_PICKER__NOVEMBER,
        LOCALE.DATE_RANGE_PICKER__DECEMBER,
    ],
};

const initDateRangePicker = (target) => {
    let options = {
        locale,
    };
    let ranges = target.attr('data-ranges');

    if (ranges) {
        options.ranges = window[ranges];
    }

    if (target.is('input')) {
        target.daterangepicker(options, function (start, end, label) {
            target.trigger('daterangepicker:change', [start, end, label]);
        });
    } else {
        let txtStart = target.find('[name=startDate]');
        let startDate = txtStart.val() || null;
        let txtEnd = target.find('[name=endDate]');
        let endDate = txtEnd.val() || null;
        let isDisabled = target.attr('data-disabled') === 'true';
        let placeholder = $(`<input type="text" class="form-control required" ${isDisabled ? 'disabled' : ''} />`);

        if (startDate && endDate) {
            options.startDate = startDate;
            options.endDate = endDate;
        }

        target.append(placeholder);
        placeholder.daterangepicker(options, function (start, end, label) {
            txtStart.val(start.format(LOCALE.FORMAT__DATE));
            txtEnd.val(end.format(LOCALE.FORMAT__DATE));
            target.trigger('daterangepicker:change', [start, end, label]);
        });

        if (!(startDate && endDate)) {
            placeholder.val('');
        }
    }
};

export default () => {
    $('.date-range-picker').each(function () {
        initDateRangePicker($(this));
    });

    $(document.body).on('date-range-picker:none', '.date-range-picker', function () {
        initDateRangePicker($(this));
    });
};
