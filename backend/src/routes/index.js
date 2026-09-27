import { Router } from 'express';
import { sendSuccess } from '../responses/apiResponse.js';
import productoRoutes from './producto.routes.js';

const router = Router();

router.get('/', (req, res) => {
    return sendSuccess(res, {
        servicio: 'Positano Muebles API',
        version: '1.0.0'
    });
});

router.use('/productos', productoRoutes);

export default router;
