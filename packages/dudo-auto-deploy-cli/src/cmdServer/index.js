module.exports = (program, logger) => {
    program
        .command('server <action> [id]')
        .description('manage server. <action> can be "list", "add", "edit" or "delete"')
        .action(require('./server')(logger));
};
