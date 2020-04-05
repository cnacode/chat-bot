import mongooseConnection from './mongoose'
import createLogger from './logger'
import express from './express'
import errorHandler from './errorHandler'
import config from '../config'
import services from './services'
import asyncHandler from './asyncHandler'

export default async function (app: Application) {
    // load logger
    const logger = createLogger(app)
    logger.info('✅logger loaded!')

    //load express middlewares
    express(app)
    logger.info('✅express loaded!')

    //load errorHandler
    errorHandler({ app, logger })
    logger.info('✅error handler loaded!')

    // establish database connection
    const db = await mongooseConnection(logger)
    if (!db) return logger.error(`stopping app initialization and exiting`)
    logger.info('✅database models loaded!')

    services(app, { logger, asyncHandler })
    logger.info(`ℹ️ application port ${config.port}`)
}
