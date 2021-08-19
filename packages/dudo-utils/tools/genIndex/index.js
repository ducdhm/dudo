const path = require('path');
const updateIndex = require('update-index');

updateIndex(path.join(__dirname, '..', '..', 'src'), path.join(__dirname, '..', '..'), 'FILE');
