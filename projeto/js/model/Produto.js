export class Produto {
    constructor(nome, quantidade, preco, foto = 'sem-foto.jpg') {
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
        this.foto = foto;
    }

    getSubtotal() {
        return this.preco * this.quantidade;
    }
}