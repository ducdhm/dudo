const argv = require('yargs').argv;

if (argv.setup) {
    require('./setup');
}