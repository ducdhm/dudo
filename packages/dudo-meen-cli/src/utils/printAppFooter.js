const color = require('colors/safe');
const path = require('path');
const CURRENT_FOLDER = process.cwd();

module.exports = (name) => {
    const appConfigPath = path.join(CURRENT_FOLDER, '@local/config/app');

    console.log(`
Your "${name}" app is ready. Please do the following stuff to continue your work:
 1. Add/update port number for your app at "${appConfigPath}"
 2. Run "npm run ${name}" to start your app
    
Thanks for using ${color.blue('M.E.E.N')} and good luck!
${color.blue('/Duc')}
--
Email: ducdhm@gmail.com
Github: http://github.com/ducdhm`);
};
