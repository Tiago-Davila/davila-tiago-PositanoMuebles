class Pedido {

    constructor(numero, fecha, tipo, estado, total, montoSenia, cliente){

        this.numero = numero;

        this.fecha = fecha;

        this.tipo = tipo;

        this.estado = estado;

        this.total = total;

        this.montoSenia = montoSenia;

        this.cliente = cliente;

        this.items = [];

        this.pagos = [];

        this.envio = null;

    }

}

export default Pedido;
