import { createError, AppErrorsInterface, AppErrorObject} from './types';
import { humanStrings } from './humanStrings'

class AppErrors implements AppErrorsInterface {
    envNotFound: AppErrorObject = createError(1001, humanStrings.criticalError);
}

export default new AppErrors();