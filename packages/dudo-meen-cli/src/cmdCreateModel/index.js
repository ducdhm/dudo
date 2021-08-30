module.exports = (program, logger) => {
    program
        .command('model')
        .description('create a model')
        .requiredOption('-n, --name <name>', 'model name')
        .action(require('./createModel')(logger));
};
