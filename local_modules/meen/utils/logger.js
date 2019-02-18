const resolvePath = require('../utils/resolvePath');
const { loggers, format, transports } = require('winston');
const { combine, timestamp, printf, splat, label } = format;
const config = require('../utils/config');
require('winston-daily-rotate-file');

const myFormat = printf(info => {
    let level = info.level.toUpperCase();

    return `[${info.timestamp}]  [${level}]  [${info.label}]  ${info.message}`;
});

function getLogger(category, appName = 'application') {
    loggers.add(category, {
        format: combine(
            timestamp(),
            label({ label: category }),
            splat(),
            myFormat
        ),
        transports: [
            config.logFile ? new transports.DailyRotateFile({
                level: 'debug',
                filename: resolvePath('log', appName + '-%DATE%.log'),
                datePattern: 'YYYYMMDD',
                zippedArchive: false,
                maxSize: '5m',
                maxFiles: '14d'
            }) : null,
            new transports.Console({
                level: 'debug'
            })
        ],
        exitOnError: false
    });

    const logger = loggers.get(category);
    logger.stream = {
        write: (message, encoding) => {
            logger.info(message);
        }
    };

    return logger;
}

module.exports = getLogger;