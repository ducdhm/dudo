module.exports = (program) => {
    program
        .command('model <name>')
        .description('create a model')
        .action(require('./createModel'));
};
