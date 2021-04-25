import { Router } from 'express'
import { getRepository } from 'typeorm'
import { Message } from '../../models/message'

const routes = Router()

export default function (app: Router, dependencies: ServiceDependencies) {
    const { logger, asyncHandler } = dependencies

    const get = async (req: APIRequest, res: APIResponse) => {
        const { id } = req.params
        const messages = getRepository(Message)
        if (id) {
            const message = await messages.findOne({ id: Number(id) })
            if (!message) return res.status(404).send()
            return res.json(message)
        }
        return res.status(400).send()
    }

    const deleteMessage = async (req: APIRequest, res: APIResponse) => {
        const { id } = req.params
        const messages = getRepository(Message)
        if (id) {
            await messages.delete({ id: Number(id) })
            return res.status(200).send()
        }
        return res.status(400).send()
    }

    const list = async (req: APIRequest, res: APIResponse) => {
        const messages = getRepository(Message)
        const message = await messages.find()
        return res.json(message)
    }

    app.use('/message', routes)
    routes.get('/', [asyncHandler(list)])
    routes.get('/:id', [asyncHandler(get)])
    routes.delete('/:id', [asyncHandler(deleteMessage)])
    logger.info('✅ meta service loaded!')
}
