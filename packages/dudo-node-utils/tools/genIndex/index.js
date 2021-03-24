const path = require('path');
const logger = require('@dudojs/logger')();
const updateIndex = require('update-index');

logger.info(`Generate "index.js" file`);
updateIndex(path.join(__dirname, '..', '..', 'src'), path.join(__dirname, '..', '..'), 'FILE');
