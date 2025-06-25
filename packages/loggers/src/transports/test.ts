import path from 'path/posix'
import winston from 'winston'
export default [
  new winston.transports.File({
    filename: path.join(global.rootPath, 'logs/') + new Date().toISOString().slice(0, 10) + '.log',
  }),
  new winston.transports.Console(),
]
