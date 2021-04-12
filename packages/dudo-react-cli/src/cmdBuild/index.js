module.exports = (program, logger) => {
    program
        .command('build')
        .description('build and zip "build" folder')
        .action(require('./build')(logger));
};
