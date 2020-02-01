
import { Router } from 'express';

//import services
import dummyService from './dummyService/routes';

export default () => {
    const router = Router();

    // activate/deactivate services
    router.use('/dummy', dummyService);

    return router;
}