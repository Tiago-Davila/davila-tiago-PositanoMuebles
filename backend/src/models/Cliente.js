import Usuario from './Usuario.js';

class Cliente extends Usuario {

    constructor(id, nombre, apellido, email, telefono, fechaAlta, documento, esProfesional, estadoCuenta){

        super(id, nombre, apellido, email, telefono, fechaAlta);

        this.documento = documento;

        this.esProfesional = esProfesional;

        this.estadoCuenta = estadoCuenta;

        this.direcciones = [];

        this.carrito = null;

        this.cotizaciones = [];

        this.pedidos = [];

        this.turnos = [];

    }

}

export default Cliente;
