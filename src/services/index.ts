
import { Router } from 'express';

//import services
import createMetaService from './meta';
import { asyncHandler } from '../util/asyncHandler';

export default () => {
    const router = Router();
    const metaService = createMetaService(asyncHandler)

    // activate/deactivate services
    router.use('/meta', metaService);

    return router;
}