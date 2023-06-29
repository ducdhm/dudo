const {loggers, format, transports} = require('winston')
const {combine, timestamp, printf, splat, label} = format
const colors = require('colors/safe')
const split = require('split')

const myFormat = printf(info => {
  let timestamp = colors.grey(info.timestamp)
  let level = info.level.toUpperCase()
  switch (level.toString()) {
    case 'DEBUG':
      level = colors.blue(level)
      break

    case 'INFO':
      level = colors.cyan(level)
      break

    case 'WARN':
      level = colors.yellow(level)
      break

    case 'ERROR':
      level = colors.red(level)
      break

    default:
    // Do nothing
  }

  let label = colors.magenta(info.label)
  let message = info.message

  return `[${timestamp}]  [${level}]  [${label}]  ${message}`
})

module.exports = (category, level) => {
  if (typeof level === 'undefined') {
    level = process.env.LOG_LEVEL || 'info'
  }

  let appTransports = [
    new transports.Console({
      level: level,
    }),
  ]

  loggers.add(category, {
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      label({label: category}),
      splat(),
      myFormat,
    ),
    transports: appTransports,
    exitOnError: false,
  })

  const logger = loggers.get(category)
  logger.stream = split().on('data', function (message) {
    logger.info(message)
  })

  return logger
}
