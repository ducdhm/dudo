const path = require('path');
const updateIndex = require('update-index');

updateIndex({
    target: path.join(__dirname, '..', '..', 'src'),
    destination: path.join(__dirname, '..', '..'),
    mode: 'FILE',
    filter: (children) => children.filter(child => child.indexOf('.test.js') === -1),
});
