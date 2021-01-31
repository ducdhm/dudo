# @dudojs/webpack
Compose webpack.config.js with awesome style!

## Usage
At your `webpack.config.js`,
```javascript
const composeWebpack = require('@dudojs/webpack');
module.exports = composeWebpack({
    name: 'folderName',
    outputPath: 'path/to/your/output/folder',
    publicPath: '/your/public/path',
    entry: {
        'entry1': 'path/to/entry1',
        'entry2': 'path/to/entry2',
        // ...
    },
    options: {
        // Your custom webpack options
    },
});
```

## License
Please read at [here](./LICENSE.md)

