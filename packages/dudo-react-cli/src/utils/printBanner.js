const clear = require('clear');
const figlet = require('figlet');
const color = require('colors/safe');

module.exports = () => {
    clear();
    console.log(
        color.blue(
            '======================[ (c) Duc Doan ]======================'
            +
            '\n'
            +
            figlet.textSync('  DREACT', {
                horizontalLayout: 'full',
            })
            +
            '\n'
            +
            '====================[ ducdhm@gmail.com ]===================='
        )
    );
};
