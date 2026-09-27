import { Router } from 'express';
import { sendSuccess } from '../responses/apiResponse.js';

const router = Router();

router.get('/', (req, res) => {
    return sendSuccess(res, {
        servicio: 'Positano Muebles API',
        version: '1.0.0'
    });
});

export default router;
