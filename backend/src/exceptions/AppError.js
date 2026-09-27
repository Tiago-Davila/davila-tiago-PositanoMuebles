export class AppError extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'AppError';
    }

}

export class BadRequestError extends AppError {

    constructor(message) {
        super(message, 400);
        this.name = 'BadRequestError';
    }

}

export class NotFoundError extends AppError {

    constructor(message) {
        super(message, 404);
        this.name = 'NotFoundError';
    }

}

export class ConflictError extends AppError {

    constructor(message) {
        super(message, 409);
        this.name = 'ConflictError';
    }

}

export class InternalError extends AppError {

    constructor(message) {
        super(message, 500);
        this.name = 'InternalError';
    }

}

export default AppError;
