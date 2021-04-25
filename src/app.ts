import express from 'express'
import config from './config'
import createDatabase from './loaders/database'
import createLogger from './loaders/logger'
import expressMiddlewares from './loaders/express'
import errorHandler from './loaders/errorHandler'
import services from './loaders/services'
import asyncHandler from './loaders/asyncHandler'
import socketio from './loaders/socketio'
import bot from './loaders/bot'
import { createServer } from 'http'

async function startServer() {
    const app = express()
    const server = createServer(app)
    try {
        // load logger
        const logger = createLogger(app)
        logger.info('✅logger loaded!')

        //load express middlewares
        expressMiddlewares(app)
        logger.info('✅express loaded!')

        //load errorHandler
        errorHandler({ app, logger })
        logger.info('✅error handler loaded!')

        // establish database connection
        const { database } = await createDatabase(logger)
        if (!database) return logger.error(`database failed to load, exiting`)
        logger.info('✅database models loaded!')

        services(app, { logger, asyncHandler, database })

        const { connect, disconnect } = socketio({ server, logger })

        bot({ connect, disconnect, database })

        server.listen(config.port)
        logger.info(`ℹ️ application port ${config.port}`)
    } catch (e) {
        console.log(e)
    }
}

startServer()

process.on('SIGINT', () => {
    console.log('Bye bye!')
    process.exit()
})
