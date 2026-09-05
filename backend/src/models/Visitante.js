import Usuario from './Usuario.js';

class Visitante extends Usuario {

    constructor(id, nombre, apellido, email, telefono, fechaAlta, idSesion){

        super(id, nombre, apellido, email, telefono, fechaAlta);

        this.idSesion = idSesion;

    }

}

export default Visitante;
