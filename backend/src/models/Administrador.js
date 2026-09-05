import Usuario from './Usuario.js';

class Administrador extends Usuario {

    constructor(id, nombre, apellido, email, telefono, fechaAlta, legajo, area){

        super(id, nombre, apellido, email, telefono, fechaAlta);

        this.legajo = legajo;

        this.area = area;

    }

}

export default Administrador;
