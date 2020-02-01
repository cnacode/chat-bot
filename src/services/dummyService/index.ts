import { Router } from 'express';
import dummyController from './controller'
import verify from './verification'


export default (asyncHandler: any) => {
    const dummyRouter = Router();
    dummyRouter.route('/dummy').get(
        asyncHandler(verify.getDummyData),
        asyncHandler(dummyController.getDummyData)
    )

    return dummyRouter;
}


