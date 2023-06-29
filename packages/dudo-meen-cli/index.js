#!/usr/bin/env node

const packageJson = require('./package')
const program = require('commander')


// Setup program
// -----------------------------------------
program.name('meen')
program.storeOptionsAsProperties(false)
program.passCommandToAction(false)
program.version(packageJson.version, '-v, --version', 'output the version number')
program.description(packageJson.description)
program.usage(`[command] [options] `)


// Commands
// -----------------------------------------
require('./src/cmdCreateModel')(program)
require('./src/cmdCreateModule')(program)
require('./src/cmdCreateLocal')(program)


// Invalid command
// -----------------------------------------
program.on('command:*', () => {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
  process.exit(1)
})


// When no command
// -----------------------------------------
if (process.argv.length <= 2) {
  process.argv.push('-h')
}


// Start program
// -----------------------------------------
program.parse(process.argv)
