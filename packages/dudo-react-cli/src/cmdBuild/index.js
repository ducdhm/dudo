module.exports = (program, logger) => {
    program
        .command('build')
        .description('build and zip "build" folder')
        .option('-s, --script <script>', 'build script. Default is "npm run build"')
        .action(require('./build')(logger));
};
