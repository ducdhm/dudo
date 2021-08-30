const moment = require('moment');

module.exports = (app, extraFormatter) => {
    const { config } = app;

    if (typeof extraFormatter === 'function') {
        extraFormatter = extraFormatter(app, config);
    }

    return {
        currentTime: () => new Date(),
        currentYear: () => (new Date()).getFullYear(),
        typeOf: (value) => typeof value,
        inArray: (array, item) => Array.isArray(array) && array.includes(item),
        option: (text, value, isSelected, extraClass = '', id, isDisabled) => {
            let attrId = id ? `id="${id}"` : '';
            let attrSelected = isSelected ? 'selected' : '';
            let attrDisabled = isDisabled ? 'disabled' : '';

            return `<option value="${value}" class="${extraClass}" ${attrId} ${attrSelected} ${attrDisabled}>${text}</option>`;
        },
        radio: (name, value, isChecked, extraClass = '', id, isDisabled) => {
            let attrId = id ? `id="${id}"` : '';
            let attrChecked = isChecked ? 'checked' : '';
            let attrDisabled = isDisabled ? 'disabled' : '';

            return `<input type="radio" name="${name}" value="${value}" class="${extraClass}" ${attrId} ${attrChecked} ${attrDisabled} />`;
        },
        checkbox: (name, value, isChecked, extraClass = '', id, isDisabled) => {
            let attrId = id ? `id="${id}"` : '';
            let attrChecked = isChecked ? 'checked' : '';
            let attrDisabled = isDisabled ? 'disabled' : '';

            return `<input type="checkbox" name="${name}" value="${value}" class="${extraClass}" ${attrId} ${attrChecked} ${attrDisabled} />`;
        },
        formatDateTimestamp: (time) => {
            return time ? moment(time).unix() : '';
        },
        formatDateIso: (time) => {
            return time ? moment(time).toISOString() : '';
        },
        formatDate: (time) => {
            return time ? moment(time).format('DD/MM/YYYY') : '';
        },
        formatDateTime: (time) => {
            return time ? moment(time).format('DD/MM/YYYY HH:mm') : '';
        },
        formatDateTimeLong: (time) => {
            return time ? moment(time).format('DD/MM/YYYY HH:mm:ss') : '';
        },
        formatTime: (time) => {
            return time ? moment(time).format('HH:mm') : '';
        },
        formatTimeLong: (time) => {
            return time ? moment(time).format('HH:mm:ss') : '';
        },
        formatCurrency: (money, toFixed = 0) => money ? money.toFixed(toFixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0',
        getRecordNo: (index, currentPage) => (currentPage - 1) * config.paginator.itemPerPage + (index + 1),
        queryToUrl: (query, name, value) => {
            let pairQuery = [];
            if (name && value) {
                query[name] = value;
            }

            for (let key in query) {
                pairQuery.push(`${key}=${encodeURIComponent(query[key])}`);
            }

            return pairQuery.length > 0 ? '?' + pairQuery.join('&') : '';
        },
        ...extraFormatter,
    };
};
