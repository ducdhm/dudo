const resolvePath = require('../utils/resolvePath');
const {loggers, format, transports} = require('winston');
const {combine, timestamp, printf, splat, label} = format;
const config = require('../utils/config');
require('winston-daily-rotate-file');

const myFormat = printf(info => {
    let level = info.level.toUpperCase();
    
    return `[${info.timestamp}]  [${level}]  [${info.label}]  ${info.message}`;
});

function getLogger(category, appName = 'application') {
    let appTransports = [
        new transports.Console({
            level: 'debug'
        })
    ];
    if (config.logFile) {
        appTransports.push(
            new transports.DailyRotateFile({
                level: 'debug',
                filename: resolvePath('log', appName + '-%DATE%.log'),
                datePattern: 'YYYYMMDD',
                zippedArchive: false,
                maxSize: '5m',
                maxFiles: '14d'
            })
        );
    }
    
    loggers.add(category, {
        format: combine(
            timestamp(),
            label({label: category}),
            splat(),
            myFormat
        ),
        transports: appTransports,
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