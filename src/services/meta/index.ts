import { Router } from 'express';
import dummyController from './controller'
import verify from './verification'


export default (asyncHandler: any) => {
    const metaRouter = Router();
    metaRouter.route('/').get(
        asyncHandler(verify.getDummyData),
        asyncHandler(dummyController.getMetadata)
    )

    return metaRouter;
}


