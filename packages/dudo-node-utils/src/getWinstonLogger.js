const resolvePath = require('./resolvePath');
const { loggers, format, transports } = require('winston');
const { combine, timestamp, printf, splat, label } = format;
const colors = require('colors/safe');
const split = require('split');
require('winston-daily-rotate-file');

const myFormat = printf(info => {
    let timestamp = colors.grey(info.timestamp);
    let level = info.level.toUpperCase();
    switch (level.toString()) {
        case 'DEBUG':
            level = colors.blue(level);
            break;

        case 'INFO':
            level = colors.cyan(level);
            break;

        case 'WARN':
            level = colors.yellow(level);
            break;

        case 'ERROR':
            level = colors.red(level);
            break;

        default:
        // Do nothing
    }

    let label = colors.magenta(info.label);
    let message = info.message;

    return `[${timestamp}]  [${level}]  [${label}]  ${message}`;
});

module.exports = (category, level, logFile, appName = 'MEEN') => {
    if (typeof level === 'undefined') {
        level = process.env.LOG_LEVEL || 'info';
    }

    if (typeof logFile === 'undefined') {
        logFile = process.env.LOG_FILE === 'true' || false;
    }

    let appTransports = [
        new transports.Console({
            level: level,
        }),
    ];
    if (logFile) {
        appTransports.push(
            new transports.DailyRotateFile({
                level: level,
                filename: resolvePath('log', appName + '-%DATE%.log'),
                datePattern: 'YYYYMMDD',
                zippedArchive: false,
                maxSize: '5m',
                maxFiles: '14d',
            }),
        );
    }

    loggers.add(category, {
        format: combine(
            timestamp(),
            label({ label: category }),
            splat(),
            myFormat,
        ),
        transports: appTransports,
        exitOnError: false,
    });

    const logger = loggers.get(category);
    logger.stream = split().on('data', function (message) {
        logger.info(message);
    });

    return logger;
};
