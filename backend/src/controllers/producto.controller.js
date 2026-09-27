import productoService from '../services/producto.service.js';
import { sendSuccess } from '../responses/apiResponse.js';

class ProductoController {

    getAll = (req, res) => {
        return sendSuccess(res, productoService.obtenerTodos());
    };

    getById = (req, res) => {
        return sendSuccess(res, productoService.obtenerPorId(req.params.id));
    };

    create = (req, res) => {
        return sendSuccess(res, productoService.crear(req.body), 201);
    };

    update = (req, res) => {
        return sendSuccess(res, productoService.modificar(req.params.id, req.body));
    };

    remove = (req, res) => {
        return sendSuccess(res, productoService.eliminar(req.params.id));
    };

}

export default new ProductoController();
