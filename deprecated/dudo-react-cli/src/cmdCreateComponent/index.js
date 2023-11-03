module.exports = (program) => {
  program
    .command('component <name>')
    .description('create component')
    .option('-t, --target <target>', 'target folder')
    .option('-l, --layout', 'layout component')
    .option('-p, --page', 'page component')
    .action(require('./createComponent'))
}
