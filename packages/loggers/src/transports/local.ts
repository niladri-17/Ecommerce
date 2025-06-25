declare global {
  var rootPath: string;
}
global.rootPath = process.cwd();
import path from "path/posix";
import winston from "winston";
export default [
  new winston.transports.File({
    filename:
      path.join(global.rootPath, "../logs/") +
      new Date().toISOString().slice(0, 10) +
      ".log",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message, stack, ...rest }) => {
        let restString = JSON.stringify(rest, undefined, 2);
        restString = restString === "{}" ? "" : restString;
        stack = !stack ? "" : stack;
        return `[${timestamp}] ${level} - ${message} ${
          stack && "\n\n" + stack + "\n"
        } ${restString && "\n\n" + restString}`;
      })
    ),
  }),
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message, stack, ...rest }) => {
        let restString = JSON.stringify(rest, undefined, 2);
        restString = restString === "{}" ? "" : restString;
        stack = !stack ? "" : stack;
        return `[${timestamp}] ${level} - ${message} ${
          stack && "\n\n" + stack + "\n"
        } ${restString && "\n\n" + restString}`;
      })
    ),
  }),
];
