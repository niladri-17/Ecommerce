import winston from "winston";
import { transports } from "./transports";

/**
 * AppLogger - A logging utility class using Winston
 */
class AppLogger {
  private _logger: winston.Logger;

  constructor() {
    this._logger = winston.createLogger({
      levels: winston.config.npm.levels,
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      transports,
      exitOnError: false,
    });
  }

  /**
   * Get the Winston logger instance
   */
  public get instance(): winston.Logger {
    return this._logger;
  }

  /**
   * Create a log entry
   * @param entry Winston log entry
   */
  private create(entry: winston.LogEntry): void {
    this._logger.log(entry);
  }

  /**
   * Log an error
   * @param error Error object
   * @param meta Optional metadata
   */
  public error(
    message: winston.LogEntry["message"] = "",
    error: Error,
    meta: Record<string, any> = {}
  ): void {
    this.create({
      level: "error",
      message: message || error.message, // use provided message or fallback to error message
      stack: error.stack,
      ...meta,
    });
  }

  /**
   * Log a warning message
   * @param message Warning message
   * @param meta Optional metadata
   */
  public warn(
    message: winston.LogEntry["message"],
    meta: Record<string, any> = {}
  ): void {
    this.create({
      level: "warn",
      message,
      ...meta,
    });
  }

  /**
   * Log an info message
   * @param message Info message
   * @param meta Optional metadata
   */
  public info(
    message: winston.LogEntry["message"],
    meta: Record<string, any> = {}
  ): void {
    this.create({
      level: "info",
      message,
      ...meta,
    });
  }

  /**
   * Log a debug message
   * @param message Debug message
   * @param meta Optional metadata
   */
  public debug(
    message: winston.LogEntry["message"],
    meta: Record<string, any> = {}
  ): void {
    this.create({
      level: "debug",
      message,
      ...meta,
    });
  }
}

// Export a singleton instance
export default new AppLogger();
