import { Config } from "../config";

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

interface Options {
  overrideProductionCheck?: boolean;
}

const isProduction = Config.MODE === "production";

const log =
  (level: LogLevel, ...args: unknown[]) =>
  ({ overrideProductionCheck }: Options): void => {
    if (!isProduction || overrideProductionCheck) {
      const timestamp = new Date().toISOString();
      const logPrefix = `[${timestamp}] [${level}]`;
      console.log(logPrefix, ...args);
    }
  };

const createLoggerFunction =
  (level: LogLevel) =>
  (...args: unknown[]) =>
  (options: Options = { overrideProductionCheck: false }) =>
    log(level, ...args)(options);

export const logger = {
  debug: createLoggerFunction(LogLevel.DEBUG),
  info: createLoggerFunction(LogLevel.INFO),
  warn: createLoggerFunction(LogLevel.WARN),
  error: createLoggerFunction(LogLevel.ERROR),
};
