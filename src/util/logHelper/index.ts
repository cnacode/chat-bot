import winston from 'winston';

const createLogger = (app: Application) => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console()
        ]
    });
    
    app.set('logger', logger);
    return logger;
}

export default createLogger;