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

const log = (level, iconLabel, msg, depth = 0) => {
    const label = `[${getLabel(level, iconLabel)}]`;
    
    console.log(`${label} ${genDepth(depth)}${msg}`);
};

module.exports = (iconLabel) => {
    return {
        info: (msg, depth) => {
            log('info', iconLabel, msg, depth);
        },
        debug: (msg, depth) => {
            log('debug', iconLabel, msg, depth);
        },
        success: (msg, depth) => {
            log('success', iconLabel, msg, depth);
        },
        warn: (msg, depth) => {
            log('warn', iconLabel, msg, depth);
        },
        error: (msg, depth) => {
            log('error', iconLabel, msg, depth);
        },
        question: (msg, depth) => {
            log('question', iconLabel, msg, depth);
        },
    };
};
