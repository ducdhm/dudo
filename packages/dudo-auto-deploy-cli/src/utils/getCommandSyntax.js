const color = require('colors/safe');

const getCommandSyntax = (command) => color.cyan(`auto-deploy ${command}`);

module.exports = getCommandSyntax;
