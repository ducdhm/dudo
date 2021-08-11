const clear = require('clear');
const figlet = require('figlet');
const color = require('colors/safe');

const printBanner = () => {
    clear();
    console.log(
        color.blue(
            '===============================[ (c) Duc Doan ]==============================='
            +
            '\n'
            +
            figlet.textSync('Auto Deploy', {
                horizontalLayout: 'full',
            })
            +
            '\n'
            +
            '=============================[ ducdhm@gmail.com ]============================='
        )
    );
};

module.exports = printBanner;
