# publish-package-version
A utility to publishing new version for your package, includes creating tag & release on Github and publish package to NPM

## Usage
```js
/**
 * @param {Function} callback Will be called after update new version 
 * into "package.json" and before commit+push to Github and publish to NPM
 */
publishNewVersion(callback);
```

## Example
```js
const publishNewVersion = require('publish-new-version');
publishNewVersion(async (logger) => {
    logger.info('Doing some thing...');
    doSomeThing();
    
    logger.info('Doing other thing...')
    await doOtherThing();
});
```

## License
Please read at [here](./LICENSE.md)
