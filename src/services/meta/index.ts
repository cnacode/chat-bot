import { Router } from 'express'
import { generateAppData } from './service'
import { verify } from './middlewares'

const routes = Router()

export default function (app: Router, dependencies: ServiceDependencies) {
    const { logger, asyncHandler } = dependencies

    const get = async (req: APIRequest, res: APIResponse) => {
        const data = await generateAppData({ logger })
        res.json(data)
    }

    app.use('/meta', routes)
    routes.get('/', [verify.getAppData, asyncHandler(get)])
    logger.info('✅ meta service loaded!')
}
