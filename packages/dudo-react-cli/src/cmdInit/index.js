module.exports = (program, logger) => {
    program
        .command('init [target]')
        .option('-n, --name <name>', 'app name')
        .option('-t, --title <title>', 'app title')
        .option('-d, --description <description>', 'app description')
        .option('-c, --color <color>', 'app color')
        .description('init React app with enhance "create-react-app" structure')
        .action(require('./init')(logger));
};
