import AppError from '../exceptions/AppError.js';
import Messages from '../enums/Messages.js';
import { sendError } from '../responses/apiResponse.js';

const errorHandler = (err, req, res, next) => {

    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof AppError) {
        return sendError(res, err.message, err.statusCode);
    }

    if (err.type === 'entity.parse.failed') {
        return sendError(res, Messages.INVALID_DATA, 400);
    }

    console.error(err);
    return sendError(res, Messages.INTERNAL_ERROR, 500);

};

export default errorHandler;
