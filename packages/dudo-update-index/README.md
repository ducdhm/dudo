# @dudojs/update-index
An awesome utility to create/update `index.js` file

## Usage
```js
/**
 * @param {String} target Absolute path of target folder
 * @param {String} destination Absolute path of destination folder which "index.js" filw is created
 * @param {String} mode Read mode when create/update "index.js" file. If is "FILE", all JS file under target folder will be listed. If is "FOLDER", all sub folder under target folder will be listed. If is blank or null, all JS file and sub folder will be listed
 * @param {String} prefix Prefix string for export name. Default export name will be name of folder or file without extension.
 * @param {String} suffix Suffix string for export name. Default export name will be name of folder or file without extension.
 */
updateIndex(target, destination, mode, prefix, suffix);
```

## Example
```js
const updateIndex = require('update-index');
const path = require('path');
updateIndex(path.join(__dirname, './utils'), path.join(__dirname, './'), 'FILE', null, 'Util');
```

## License
Please read at [here](./LICENSE.md)
