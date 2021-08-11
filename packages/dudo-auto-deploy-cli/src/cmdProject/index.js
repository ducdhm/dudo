module.exports = (program) => {
    program
        .command('project [action]')
        .description('manage project. <action> can be "list", "add", "edit", "delete" and "deploy"')
        .action(require('./project'));
};
