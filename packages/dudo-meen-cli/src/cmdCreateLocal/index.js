module.exports = (program) => {
    program
        .command('local <name>')
        .description('create a local package')
        .action(require('./createLocal'));
};
