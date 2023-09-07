import {CustomError} from "./custom-error";

export class NotAuthorizedError extends CustomError{

    statusCode: number = 401

    constructor() {
        super('Route Not found.');
        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors(){
        return [{message: 'Not Authorized'}]
    }
}