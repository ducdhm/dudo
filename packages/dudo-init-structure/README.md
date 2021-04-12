# @dudojs/init-structure
The awesome tool to initialize folder structure with pre-defined structure and template!

## Usage

```js
/**
 * @param {String} target Path to target folder
 * @param {Object|Array<Object>} structure Folder structure includes sub-folders and files
 * @param {Object} fileData Data for creating file from template
 * @param {Object} callback List of callback
 */
initStructure(target, structure, fileData, callback);
```

### Callback list
1. `beforeCreate`: Will be called before initializing structure
1. `onCreated`: Will be called after initializing structure
1. `beforeItemCreate`: Will be called before initializing each item of structure. Available only when `structure` is `Array`
1. `onItemCreated`: Will be called after initializing each item of structure. Available only when `structure` is `Array`

### Callback params
1. `options`: Includes `target`, `structure` and `fileData`. `structure` will be item of structure if `structure` is `Array`
1. `logger`: Available methods are `info`, `debug`, `success`, `warn` and `error`

## Example

### Single folder

```js
const initStructure = require('@dudojs/init-structure');
const path = require('path');
const target = path.join(__dirname, 'src');
const structure = {
    hello: {
        'hello.js': path.join(__dirname, 'template', 'js.hbs'),
        'hello.css': path.join(__dirname, 'template', 'css.hbs'),
        'hello.html': path.join(__dirname, 'template', 'html.hbs'),
    }
};
const fileData = {
    name: 'hello',
    nameUppercase: 'HELLO',
    nameTitle: 'Hello'
};

initStructure(target, structure, fileData, {
    beforeCreate: (options, logger) => {
        logger.info(`Preparing to create "hello"...`);
    },
    onCreated: (options, logger) => {
        logger.info(`=> DONE!`);
    }
});
```

### Multiple folders

```js
const initStructure = require('init-structure');
const path = require('path');
const target = path.join(__dirname, 'src');
const structure = [
    {
        hello: {
            'hello.js': path.join(__dirname, 'template', 'js.hbs'),
            'hello.css': path.join(__dirname, 'template', 'css.hbs'),
            'hello.html': path.join(__dirname, 'template', 'html.hbs'),
        }
    },
    {
        world: {
            'world.js': path.join(__dirname, 'template', 'js.hbs'),
            'world.css': path.join(__dirname, 'template', 'css.hbs'),
            'world.html': path.join(__dirname, 'template', 'html.hbs'),
        }
    }
];
const fileData = {
    name: 'hello world',
    nameUppercase: 'HELLO WORLD',
    nameTitle: 'Hello World'
};

initStructure(target, structure, fileData, {
    beforeCreate: (options, logger) => {
        logger.info(`Preparing to create "hello world"...`);
    },
    onCreated: (options, logger) => {
        logger.info(`=> DONE!`);
    },
    beforeItemCreate: (options, logger) => {
        logger.info(`Preparing to create sub-folder:\n${JSON.stringify(options.structure, ' ', 4)}`);
    },
    onItemCreated: (options, logger) => {
        logger.info('Sub-folder is created!');
    }
});
```

## License

Please read at [here](./LICENSE.md)
