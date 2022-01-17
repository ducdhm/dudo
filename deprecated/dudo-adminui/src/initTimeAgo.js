import 'timeago';
const TIMEAGO_LOCALE = {
    en: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
    },
    vi: {
        prefixAgo: 'cách đây',
        prefixFromNow: null,
        suffixAgo: "trước",
        suffixFromNow: "kể từ bây giờ",
        seconds: "chưa đến một phút",
        minute: "khoảng một phút",
        minutes: "%d phút",
        hour: "khoảng một tiếng",
        hours: "khoảng %d tiếng",
        day: "một ngày",
        days: "%d ngày",
        month: "khoảng một tháng",
        months: "%d tháng",
        year: "khoảng một năm",
        years: "%d năm",
        wordSeparator: " ",
        numbers: []
    }
};

export default () => {
    jQuery.timeago.settings.strings = TIMEAGO_LOCALE[window.LOCALE.LANG];

    $('.timeago').timeago();

    $(document.body).on('timeago:none', '.timeago', function () {
        $('.timeago').timeago();
    });
};
