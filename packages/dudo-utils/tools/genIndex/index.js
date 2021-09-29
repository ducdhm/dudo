const path = require('path');
const updateIndex = require('@dudojs/update-index');

updateIndex({
    target: path.join(__dirname, '..', '..', 'src'),
    destination: path.join(__dirname, '..', '..'),
    mode: 'FILE',
});
