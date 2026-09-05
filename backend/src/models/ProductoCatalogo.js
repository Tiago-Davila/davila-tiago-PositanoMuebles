import Producto from './Producto.js';

class ProductoCatalogo extends Producto {

    constructor(id, nombre, descripcion, precioBase, activo, categoria, sku, stock){

        super(id, nombre, descripcion, precioBase, activo, categoria);

        this.sku = sku;

        this.stock = stock;

    }

}

export default ProductoCatalogo;
