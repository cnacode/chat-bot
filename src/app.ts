import express from 'express'
import loaders from './loaders'
import config from './config'

async function startServer() {
    const app = express()
    try {
        await loaders(app)
    } catch (e) {
        console.log(e)
    }
    app.listen(config.port)
}

startServer()

process.on('SIGINT', () => {
    console.log('Bye bye!')
    process.exit()
})
