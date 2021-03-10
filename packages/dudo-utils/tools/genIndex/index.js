const getLogger = require('../../src/getLogger');
const updateIndex = require('update-index');
const path = require('path');
const logger = getLogger();

logger.info(`Generate "index.js" file`);
updateIndex(path.join(__dirname, '..', '..', 'src'), path.join(__dirname, '..', '..'), 'FILE');

