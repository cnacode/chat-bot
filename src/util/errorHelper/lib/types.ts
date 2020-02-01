/* eslint-disable @typescript-eslint/no-explicit-any */
import ExtendedError from "./extendedError";

export type AppErrorObject = (context?: PrivateErrorData) => ExtendedError;

export type PrivateErrorData = {
    mayday?: string;
    data?: any;
}

export const createError = (name: number, message: any) => (context?: PrivateErrorData): ExtendedError =>
{
    const error = new ExtendedError(context);
    error.message = message;
    error.name = (name).toString();
    return error;
}

export interface AppErrorsInterface {
    envNotFound: AppErrorObject;
}

