#!/usr/bin/env node

const packageJson = require('./package');
const program = require('commander');


// Setup program
// -----------------------------------------
program.name('dreact');
program.storeOptionsAsProperties(false);
program.passCommandToAction(false);
program.version(packageJson.version, '-v, --version', 'output the version number');
program.description(packageJson.description);
program.usage(`[command] [options] `);


// Commands
// -----------------------------------------
require('./src/cmdBuild')(program);
require('./src/cmdCreateComponent')(program);
require('./src/cmdCreateRedux')(program);


// Invalid command
// -----------------------------------------
program.on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});


// When no command
// -----------------------------------------
if (process.argv.length <= 2) {
    process.argv.push('-h');
}


// Start program
// -----------------------------------------
program.parse(process.argv);
