module.exports = (program) => {
  program
    .command('build')
    .description('build and zip "build" folder')
    .option('-s, --script <script>', 'build script. Default is "npm run build"')
    .option('-p, --prefix <prefix>', 'prefix for zip file')
    .action(require('./build'))
}
