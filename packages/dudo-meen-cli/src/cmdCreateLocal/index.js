module.exports = (program, logger) => {
    program
        .command('local')
        .description('create a local package')
        .requiredOption('-n, --name <name>', 'local package name')
        .action(require('./createLocal')(logger));
};
