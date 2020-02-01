//import types
import { 
    Request as ExpressRequest, 
    Response as ExpressResponse,
    NextFunction as ExpressNext,
    Application as ExpressApplication,
} from "express";

declare global {
    type EnvObject = {
        NETWORK_SERVER_PORT: 'NETWORK_SERVER_PORT';
    };

    type Application = ExpressApplication;
    type APIRequest = ExpressRequest;
    type APIResponse = ExpressResponse;
    type APINext = ExpressNext;
}