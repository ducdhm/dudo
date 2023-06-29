module.exports = (program) => {
  program
    .command('redux <name>')
    .description('create redux feature')
    .action(require('./createRedux'))
}
