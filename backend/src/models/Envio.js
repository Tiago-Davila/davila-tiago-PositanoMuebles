class Envio {

    constructor(id, fechaDespacho, fechaEntrega, transportista, costo, direccion, pedido){

        this.id = id;

        this.fechaDespacho = fechaDespacho;

        this.fechaEntrega = fechaEntrega;

        this.transportista = transportista;

        this.costo = costo;

        this.direccion = direccion;

        this.pedido = pedido;

    }

}

export default Envio;
