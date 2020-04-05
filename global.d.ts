//import types
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction as ExpressNext,
    Application as ExpressApplication,
    RequestHandler,
} from 'express'
import { Logger } from 'winston'

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
    }

    type MethodDependencies = {
        logger: AppLogger
    }
}
