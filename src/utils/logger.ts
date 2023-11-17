/* tslint:disable:no-console */
import { createLogger, format, transports } from 'winston';

const env = process.env.NODE_ENV;

const { Console } = transports;

enum LEVEL {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

/**
 * Logger middleware, you can customize it to make messages more personal
 */

function logLevel(): string {
  if (env === 'production') {
    return LEVEL.INFO;
  }
  return LEVEL.DEBUG;
}

const formatLogger =
  env === 'production'
    ? format.combine(
        format.colorize(),
        format.timestamp(),
        format.json(),
        format.errors(),
      )
    : format.combine(
        format.colorize(),
        format.timestamp(),
        format.simple(),
        format.errors(),
      );

const logger = createLogger({
  exitOnError: false,
  level: logLevel(),
  transports: [new Console({ format: formatLogger, handleExceptions: true })],
});

export default logger;
