export class Pedido {
    constructor() {
        this.id = Math.random().toString(36).slice(2);
        this.nomeCompleto = null;
        this.email = null;
        this.telefone = null;
        this.cep = null;
        this.endereco = null;
        this.numero = 0;
        this.complemento = null;
        this.bairro = null;
        this.cidade = null;
        this.estado = null;
        this.observacoes = null;
        this.produtos = [];
    }

    getTotal() {
        
    }
}
