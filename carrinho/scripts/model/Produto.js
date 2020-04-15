export class Produto {
    constructor(nome, preco, quantidade) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    getTotal() {
       return this.preco * this.quantidade;
    }
}
