const path = require('path');
const updateIndex = require('update-index');

updateIndex(
    path.join(__dirname, '..', '..', 'src', 'modules'),
    path.join(__dirname, '..', '..', 'src', 'modules'),
);

updateIndex(
    path.join(__dirname, '..', '..', 'src'),
    path.join(__dirname, '..', '..'),
    'FOLDER',
);
