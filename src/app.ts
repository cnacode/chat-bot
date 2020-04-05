import express from 'express'
import loaders from './loaders'
import config from './config'

async function startServer() {
    const app = express()
    await loaders(app)
    app.listen(config.port)
}

startServer()
