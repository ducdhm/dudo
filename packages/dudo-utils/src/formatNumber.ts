export default function formatNumber(value: number, toFixed = 0): string {
    if (!value || isNaN(value)) {
        return '0';
    }
    
    let fixed = (+value).toFixed(toFixed);
    let decimal = '';
    let number = fixed;
    if (fixed.indexOf('.')) {
        let arr = fixed.split('.');
        number = arr[0];
        decimal = arr[1];
    }
    number = number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    
    return `${number}${decimal ? '.' + decimal : ''}`;
};
