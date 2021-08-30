module.exports = (program, logger) => {
    program
        .command('module')
        .description('create a module')
        .requiredOption('-n, --name <name>', 'module name')
        .requiredOption('-a, --app <app>', 'app name')
        .option('-t, --type <type>', 'module type. Can be "website" or "api"')
        .action(require('./createModule')(logger));
};
