import Producto from '../models/Producto.js';
import productoRepository from '../repositories/producto.repository.js';
import Messages from '../enums/Messages.js';
import { BadRequestError, NotFoundError, ConflictError } from '../exceptions/AppError.js';
import { esObjeto, esTextoValido, esPrecioValido, esBooleano, esIdValido } from '../utils/validators.js';
import generarId from '../utils/idGenerator.js';

class ProductoService {

    obtenerTodos() {
        return productoRepository.findAll();
    }

    obtenerPorId(id) {
        const producto = productoRepository.findById(this.#convertirId(id));

        if (!producto) {
            throw new NotFoundError(Messages.PRODUCT_NOT_FOUND);
        }

        return producto;
    }

    crear(datos) {
        this.#validarDatos(datos);

        const id = generarId(productoRepository.findAll());
        this.#validarNoDuplicado(datos.nombre, id);

        const producto = new Producto(
            id,
            datos.nombre.trim(),
            datos.descripcion.trim(),
            datos.precioBase,
            datos.activo,
            datos.categoria.trim()
        );

        return productoRepository.save(producto);
    }

    modificar(id, datos) {
        const idProducto = this.#convertirId(id);

        if (!productoRepository.findById(idProducto)) {
            throw new NotFoundError(Messages.PRODUCT_NOT_FOUND);
        }

        this.#validarDatos(datos);
        this.#validarNoDuplicado(datos.nombre, idProducto);

        const productoActualizado = new Producto(
            idProducto,
            datos.nombre.trim(),
            datos.descripcion.trim(),
            datos.precioBase,
            datos.activo,
            datos.categoria.trim()
        );

        return productoRepository.update(productoActualizado);
    }

    eliminar(id) {
        const idProducto = this.#convertirId(id);
        const productoEliminado = productoRepository.remove(idProducto);

        if (!productoEliminado) {
            throw new NotFoundError(Messages.PRODUCT_NOT_FOUND);
        }

        return productoEliminado;
    }

    #convertirId(id) {
        if (!esIdValido(id)) {
            throw new BadRequestError(Messages.INVALID_DATA);
        }

        return Number(id);
    }

    #validarDatos(datos) {
        const datosValidos = esObjeto(datos)
            && esTextoValido(datos.nombre)
            && esTextoValido(datos.descripcion)
            && esPrecioValido(datos.precioBase)
            && esBooleano(datos.activo)
            && esTextoValido(datos.categoria);

        if (!datosValidos) {
            throw new BadRequestError(Messages.INVALID_DATA);
        }
    }

    #validarNoDuplicado(nombre, idIgnorado) {
        const productoExistente = productoRepository.findByNombre(nombre);

        if (productoExistente && productoExistente.id !== idIgnorado) {
            throw new ConflictError(Messages.DUPLICATED_RESOURCE);
        }
    }

}

export default new ProductoService();
