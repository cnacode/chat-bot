
import { Router } from 'express';

//import services
import dummyService from './dummyService';

export default () => {
    const router = Router();

    // activate/deactivate services
    router.use('/dummy', dummyService);

    return router;
}