import Producto from '../models/Producto.js';

class ProductoRepository {

    constructor() {
        this.productos = [
            new Producto(1, 'Sillón Córdoba', 'Sillón de dos cuerpos tapizado en tela chenille', 185000, true, 'Sillones'),
            new Producto(2, 'Mesa Comedor Palermo', 'Mesa de comedor para 6 comensales en guatambú', 320000, true, 'Mesas'),
            new Producto(3, 'Ropero Virrey', 'Ropero de cuatro puertas con cajones', 415000, true, 'Roperos'),
            new Producto(4, 'Silla Verdi', 'Silla de comedor con respaldo tapizado en cuero', 68000, false, 'Sillas')
        ];
    }

    findAll() {
        return [...this.productos];
    }

    findById(id) {
        return this.productos.find((producto) => producto.id === id) ?? null;
    }

    findByNombre(nombre) {
        const nombreNormalizado = nombre.trim().toLowerCase();

        return this.productos.find(
            (producto) => producto.nombre.trim().toLowerCase() === nombreNormalizado
        ) ?? null;
    }

    save(producto) {
        this.productos.push(producto);
        return producto;
    }

    update(producto) {
        const indice = this.productos.findIndex((actual) => actual.id === producto.id);

        if (indice === -1) {
            return null;
        }

        this.productos[indice] = producto;
        return producto;
    }

    remove(id) {
        const indice = this.productos.findIndex((actual) => actual.id === id);

        if (indice === -1) {
            return null;
        }

        const [eliminado] = this.productos.splice(indice, 1);
        return eliminado;
    }

}

export default new ProductoRepository();
