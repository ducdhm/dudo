const colors = require('colors/safe');

const LEVEL_ICON = {
    info: 'i',
    debug: '$',
    success: 'v',
    warn: '!',
    error: 'x',
};

const LEVEL_LABEL = {
    info: 'INFO',
    debug: 'DEBUG',
    success: 'SUCCESS',
    warn: 'WARN',
    error: 'ERROR',
};

const LEVEL_COLOR = {
    info: colors.blue,
    debug: colors.cyan,
    success: colors.green,
    warn: colors.yellow,
    error: colors.red,
};

const DEFAULTS = {
    labelIcon: false,
    labelPrefix: '[',
    labelSuffix: ']',
};

module.exports = ({ labelIcon, labelPrefix, labelSuffix } = DEFAULTS) => {
    const genDepth = (depth) => ''.padStart(depth * 4, ' ');

    const getLabel = (level) => {
        return (
            labelPrefix
            +
            LEVEL_COLOR[level](labelIcon ? LEVEL_ICON[level] : LEVEL_LABEL[level])
            +
            labelSuffix
        );
    };

    const log = (level, msg, depth = 0) => {
        console.log(`${getLabel(level)} ${genDepth(depth)}${msg}`);
    };

    return {
        info: (msg, depth) => {
            log('info', msg, depth);
        },
        debug: (msg, depth) => {
            log('debug', msg, depth);
        },
        success: (msg, depth) => {
            log('success', msg, depth);
        },
        warn: (msg, depth) => {
            log('warn', msg, depth);
        },
        error: (msg, depth) => {
            log('error', msg, depth);
        },
        question: (msg, depth) => {
            log('question', msg, depth);
        },
    };
};
