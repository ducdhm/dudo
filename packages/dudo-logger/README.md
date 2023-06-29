# @dudojs/logger

Awesome logger with text or icon label!

## Usage

```javascript
/**
 * @option {Boolean} labelIcon Show label as icon or not
 * @option {String} labelPrefix Label prefix string
 * @option {String} labelPrefix Label suffix string
 */
const logger = require('@dudojs/logger')({ labelIcon, labelPrefix, labelPrefix });
logger.info('Info message');
logger.debug('Debug message');
logger.success('Success message');
logger.warn('Warning message');
logger.error('Error message');
```

## License

Please read at [here](./LICENSE.md)
