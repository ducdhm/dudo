const colors = require('colors/safe');

const LEVEL_ICON = {
    info: 'i',
    debug: '$',
    success: 'v',
    warn: '!',
    error: 'x',
    question: '?',
};

const LEVEL_LABEL = {
    info: 'INFO',
    debug: 'DEBUG',
    success: 'SUCCESS',
    warn: 'WARN',
    error: 'ERROR',
    question: 'QUESTION',
};

const LEVEL_COLOR = {
    info: colors.blue,
    debug: colors.cyan,
    success: colors.green,
    warn: colors.yellow,
    error: colors.red,
    question: colors.gray,
};

const getLabel = (level, isIcon) => {
    return LEVEL_COLOR[level](isIcon ? LEVEL_ICON[level] : LEVEL_LABEL[level]);
};

const genDepth = (depth) => ''.padStart(depth * 4, ' ');

const log = (level, iconLabel, msg, ...rest) => {
    const label = `[${getLabel(level, iconLabel)}]`;
    let others = [...rest];
    let depth = others.pop();

    if (isNaN(depth)) {
        others = others.push(depth);
        depth = 0;
    }
    
    console.log(`${label} ${genDepth(depth)}${msg}`, ...others);
};

module.exports = (iconLabel) => {
    return {
        info: (msg, ...others) => {
            log('info', iconLabel, msg, ...others);
        },
        debug: (msg, ...others) => {
            log('debug', iconLabel, msg, ...others);
        },
        success: (msg, ...others) => {
            log('success', iconLabel, msg, ...others);
        },
        warn: (msg, ...others) => {
            log('warn', iconLabel, msg, ...others);
        },
        error: (msg, ...others) => {
            log('error', iconLabel, msg, ...others);
        },
        question: (msg, ...others) => {
            log('question', iconLabel, msg, ...others);
        },
    };
};
