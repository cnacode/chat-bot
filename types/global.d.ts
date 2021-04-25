//import types
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction as ExpressNext,
    Application as ExpressApplication,
    RequestHandler,
} from 'express'
import { Logger } from 'winston'
import { Connection } from 'typeorm'

declare global {
    type EnvObject = {
        NETWORK_SERVER_PORT: 'NETWORK_SERVER_PORT'
    }
    type Application = ExpressApplication
    type APIRequest = ExpressRequest
    type APIResponse = ExpressResponse
    type APINext = ExpressNext

    type AsyncHandler = (fn: any) => any

    type AppLogger = Logger | Console

    type ServiceDependencies = {
        asyncHandler: AsyncHandler
        logger: AppLogger
        database?: Connection
    }

    type MethodDependencies = {
        logger: AppLogger
        reqData?: any
    }

    type DatabaseAbstraction = {
        database?: Connection
    }

    type IncomingMessage = {
        content: string
        customerIdentifier: string
        previousId?: string
    }

    type BotResponse = {
        id: string
        response: string
    }
}
