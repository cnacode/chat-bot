import { generateAppData } from './service'

export default function (dependencies: ServiceDependencies) {
    const { asyncHandler, logger } = dependencies

    const get = async (req: APIRequest, res: APIResponse) => {
        const data = await generateAppData({ logger })
        res.json(data)
    }

    return {
        get: asyncHandler(get),
    }
}
