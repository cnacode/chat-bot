import winston, { transports, format } from 'winston'

const createLogger = (app: Application) => {
    const consoleTransport = new transports.Console({
        format: format.combine(
            format.colorize(),
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.printf((info) => {
                const { timestamp, level, message, ...args } = info

                const ts = timestamp.slice(0, 19).replace('T', '  ')
                return `${ts} [${level}]: ${message} ${
                    Object.keys(args).length
                        ? JSON.stringify(args, null, 2)
                        : ''
                }`
            })
        ),
    })

    const logger = winston.createLogger({
        transports: [consoleTransport],
    })

    app.set('logger', logger)
    return logger
}

export default createLogger
