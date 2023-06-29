module.exports = (program) => {
  program
    .command('module <name>')
    .description('create a module')
    .requiredOption('-a, --app <app>', 'app name')
    .option('-t, --type <type>', 'module type. Can be "website" or "api"')
    .action(require('./createModule'))
}
