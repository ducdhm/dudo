const colors = require('colors/safe');

module.exports = () => {
    return {
        info: (msg, ...others) => {
            console.log(`[${colors.blue('INFO')}] ${msg}`, ...others);
        },
        debug: (msg, ...others) => {
            console.log(`[${colors.cyan('DEBUG')}] ${msg}`, ...others);
        },
        success: (msg, ...others) => {
            console.log(`[${colors.green('SUCCESS')}] ${msg}`, ...others);
        },
        warn: (msg, ...others) => {
            console.log(`[${colors.yellow('WARN')}] ${msg}`, ...others);
        },
        error: (msg, ...others) => {
            console.log(`[${colors.red('ERROR')}] ${msg}`, ...others);
        },
    };
};
