module.exports = (program) => {
    program
        .command('server [action]')
        .description('manage server. <action> can be "list", "add", "edit" or "delete"')
        .option('-i, --insecure', 'show password as plain text')
        .action(require('./server'));
};
