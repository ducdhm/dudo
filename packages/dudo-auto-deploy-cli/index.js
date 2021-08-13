#!/usr/bin/env node

const packageJson = require('./package');
const program = require('commander');
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


// Setup program
// -----------------------------------------
program.name('auto-deploy');
program.storeOptionsAsProperties(false);
program.passCommandToAction(false);
program.version(packageJson.version, '-v, --version', 'output the version number');
program.description(packageJson.description);
program.usage(`[command] [options] `);


// Commands
// -----------------------------------------
require('./src/cmdServer')(program);
require('./src/cmdProject')(program);


// Invalid command
// -----------------------------------------
program.on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});


// Print banner if printing help
// -----------------------------------------
if (process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
    printBanner();
}


// Print banner when no command
// -----------------------------------------
if (process.argv.length <= 2) {
    printBanner();
}


// Start program
// -----------------------------------------
program.parse(process.argv);
