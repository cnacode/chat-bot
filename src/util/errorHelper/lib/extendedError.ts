import { PrivateErrorData } from './types';

/**
 * Instances of this class will be thrown as errors in this application, instead of nodejs Error.
 *
 * @remarks
 * This an extension of nodejs' original Error in that data and mayday has been added as properties.
 * These two new properties will hold data about runtime private to developers only.
 *
 * !!! IMPORTANT !!!
 * Not to be used directly in business logic, must only be used in AppErrors Class.
 *
 */
export default class ExtendedError extends Error {
    private data: any;
    private mayday: string | undefined;

    constructor(context?: PrivateErrorData){
        super();
        this.data = context?.data;
        this.mayday = context?.mayday;
    }

    public blackbox() {
        const { mayday, data } = this;

        return {
            mayday,
            data
        }
    }
}