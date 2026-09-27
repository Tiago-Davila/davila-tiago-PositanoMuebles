import Messages from '../enums/Messages.js';
import { sendError } from '../responses/apiResponse.js';

const notFound = (req, res) => {
    return sendError(res, Messages.ROUTE_NOT_FOUND, 404);
};

export default notFound;
