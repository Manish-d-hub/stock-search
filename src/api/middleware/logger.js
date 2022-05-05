import { createLogger, format, transports } from 'winston';

const customFormat = format.combine(
  format.timestamp(),
  format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(7)}] - ${
      info.message
    }`;
  })
);

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({ level: 'debug', colorize: true }),
    new transports.File({
      filename: './src/api/logs/app.log',
      level: 'debug',
      colorize: true,
    }),
  ],
});

export default logger;
