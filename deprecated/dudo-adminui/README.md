# @dudojs/adminui
Awesome admin UIKit based-on AdminLTE v3!

## Usage
### Styles and scripts
```javascript
import '@dudojs/adminui/locale/{lang}'; // "lang" can be "vi" or "en" 
import '@dudojs/adminui/';
```

### `composeWebpack` method
Same as `composeWebpack` of [@dudojs/webpack](https://www.npmjs.com/package/@dudojs/webpack):

```javascript
const composeWebpack = require('@dudojs/adminui/composeWebpack');
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

but have pre-defined Webpack options as following:
```javascript
{
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: {
                        exposes: {
                            globalName: 'jQuery',
                            override: true,
                        },
                    },
                }, {
                    loader: 'expose-loader',
                    options: {
                        exposes: {
                            globalName: '$',
                            override: true,
                        },
                    },
                }],
            },
            {
                test: require.resolve('moment'),
                use: [{
                    loader: 'expose-loader',
                    options: {
                        exposes: {
                            globalName: 'moment',
                            override: true,
                        },
                    },
                }],
            },
        ],
    },
}
```
These options let `@dudojs/adminui`'s script can be runnable!

## License
Please read at [here](./LICENSE.md)
