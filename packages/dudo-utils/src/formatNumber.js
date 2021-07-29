module.exports = (value, toFixed = 0) => {
    if (!value || isNaN(value)) {
        return '0';
    }

    let fixed = (+value).toFixed(toFixed);
    let decimal = '';
    let number = fixed;
    if (fixed.indexOf('.')) {
        fixed = fixed.split('.');
        number = fixed[0];
        decimal = fixed[1]
    }
    number = number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    return `${number}${decimal ? '.' + decimal : ''}`;
};
