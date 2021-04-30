module.exports = (program, logger) => {
    program
        .command('init [target]')
        .option('-n, --name <name>', 'app name')
        .option('-t, --title <title>', 'app title')
        .option('-d, --description <description>', 'app description')
        .option('-c, --color <color>', 'app color')
        .description('init react app with enhance "create-react-app" strcture')
        .action(require('./init')(logger));
};
