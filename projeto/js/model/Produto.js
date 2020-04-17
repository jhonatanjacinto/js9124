export class Produto {
    constructor(nome, preco, quantidade, foto = 'sem-foto.jpg') {
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
        this.foto = foto;
    }

    getSubtotal() {
        return this.preco * this.quantidade;
    }
}