import {ValidationError} from "express-validator"

export class RequestValidationError extends Error{

    statusCode: number = 400

    constructor(public errors: ValidationError[]) {
        super();
        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors(){
        return this.errors.map((error: any) => {
            return {message: error.msg, field: error.path}
        })
    }
}