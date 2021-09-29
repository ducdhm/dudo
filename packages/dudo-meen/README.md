# @dudojs/meen
Awesome NodeJS stack (M.E.E.N = MongoDB + ExpressJS + EdgeJS + NodeJS)

## Methods
### `composeApp`
```javascript
/**
 * Compose an app. You can compose website or api app with built-in modules via `options` or your own fully-customised app by passing modules via `modules`
 * @param {String} appName Your app name
 * @param {Array<Function>} modules Module must be function with first param is `app` as Express App Instance and second param is `config`
 */
composeApp(appName, modules);
```

**Note**: Order of configuration as the following:
  1. [Default](./src/composeApp/defaultConfig.js)
  1. `@local/config/app.js` (will be loaded if available)
  1. `{appName}/config/app.js` (will be loaded if available)

**Note 2**: Other files in `{appName}/config/app.js` will be load as properties of `app.config`. Such as `icon.js` will be available in `app.config.icon`.
  
  
### `composeModel`
```javascript
/**
 * Compose a Mongoose model
 * @param {String} modelName Name of model
 * @param {Object} schema Schema options of mongoose
 * @param {Object} options
 * @param {Object} options.index Equals with `mongooseSchema.index` method
 * @param {Object} options.virtual List of virtual properties with key is name of virtual and value is virtual options. If you pass value as function, it will be getter. 
 * Example: 
 * {
 *     url: {
 *         get: function () {
 *             return `/url/${this._id}`;
 *         }
 *     },
 *     type: function () {
 *         return this.type;
 *     }
 * }
 * @param {Array} options.plugins Each plugin will be passed via `mongooseSchema.plugin` method
 * @param {Object} options.index Same as `mongooseSchema.index` method
 * @param {Object} options.set Same as `mongooseSchema.set` method
 * @param {Object} options.static Static properties will be added to model
 */
composeModel(modelName, schema, options, dontEnhance);
```


## Built-in modules
Each module has its own config same as its name. Example: `publicFolder` module will use `publicFolder` in config

Modules list:
 * [bodyParser](./src/modules/bodyParser.js)
 * [bruteForce](./src/modules/bruteForce.js)
 * [compression](./src/modules/compression.js)
 * [cors](./src/modules/cors.js)
 * [handleError](./src/modules/handleError.js)
 * [mongoose](./src/modules/mongoose.js)
 * [morgan](./src/modules/morgan.js)
 * [publicFolder](./src/modules/publicFolder.js)
 * [session](./src/modules/session.js)
 * [view](./src/modules/view.js)
 
 
## Presets
MEEN provides presets for app types via `config.app.preset`. Order of modules will be loaded as specified in below

### `website`:  
 1. [compression](./src/modules/compression.js)
 1. [publicFolder](./src/modules/publicFolder.js)
 1. [view](./src/modules/view.js)
 1. [session](./src/modules/session.js)
 1. [bodyParser](./src/modules/bodyParser.js)
 1. [mongoose](./src/modules/mongoose.js)
 1. [morgan](./src/modules/morgan.js)
   
### `api`: 
 1. [cors](./src/modules/cors.js)
 1. [bodyParser](./src/modules/bodyParser.js)
 1. [mongoose](./src/modules/mongoose.js)
 1. [morgan](./src/modules/morgan.js)
 
## Default configuration
```javascript
const { resolvePath } = require('@dudojs/utils');
const en = require('./locale/en');
const vi = require('./locale/vi');

module.exports = {
    lang: 'en',
    locales: {
        en,
        vi,
    },
    preset: null,
    loadLocalPackage: {
        enabled: false,
    },
    info: {
        title: 'M.E.E.N',
        version: '1.0.0',
    },
    mongoose: {
        debug: false,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    logger: {
        level: 'info',
        logFile: false,
    },
    cors: '*',
    session: {
        secret: 'M.E.E.N',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    publicFolder: {
        path: {
            '/public': resolvePath('public'),
        },
        debug: false,
    },
    view: {
        minify: false,
        cache: false,
    },
    handleError: {
        enabled: true,
        isJson: false,
    },
    bodyParser: {
        json: {
            limit: '5mb',
        },
        urlencoded: {
            limit: '5mb',
            extended: true,
        },
    },
    bruteForce: {
        mongoStore: true,
        collectionName: 'BRUTE_FORCE',
        maxRequest: 60,
        limitTime: 60 * 1000,
    },
    paginator: {
        itemPerPage: 20,
        pageStep: 2,
    },
};
```


## License
Please read at [here](./LICENSE.md)
