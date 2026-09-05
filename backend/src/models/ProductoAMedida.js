import Producto from './Producto.js';

class ProductoAMedida extends Producto {

    constructor(id, nombre, descripcion, precioBase, activo, categoria, medidaMinima, medidaMaxima, diasFabricacion){

        super(id, nombre, descripcion, precioBase, activo, categoria);

        this.medidaMinima = medidaMinima;

        this.medidaMaxima = medidaMaxima;

        this.diasFabricacion = diasFabricacion;

        this.configuraciones = [];

    }

}

export default ProductoAMedida;
