import { Router } from 'express'
const routes = Router()
import createService from './controller'
import createMiddlewares from './middlewares'

export default function (app: Router, dependencies: ServiceDependencies) {
    const { logger } = dependencies
    app.use('/meta', routes)

    const { get } = createService(dependencies)
    const { verify } = createMiddlewares(dependencies)

    routes.get('/', [verify.getAppData, get])
    logger.info('✅ meta service loaded!')
}
