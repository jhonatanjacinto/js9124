import { Produto } from "../model/Produto.js";

const listaProdutos = JSON.parse(localStorage.getItem('carrinho')) || [];

listaProdutos.forEach((produto, indice) => {
    listaProdutos[indice] = Object.assign(new Produto, produto);
});

/**
 * Função que adiciona um produto no Carrinho de Compras
 * @param {string} nome Nome do produto selecionado pelo usuário
 * @param {number} preco Preço do produto selecionado pelo usuário
 * @param {number} quantidade Quantidade do produto selecionada
 * @returns {void}
 */
export function adicionarProduto(nome, preco, quantidade)
{
    const produto = new Produto(nome, preco, quantidade);
    const mensagensErro = [];

    if (!produto.nome) {
        mensagensErro.push('O nome do produto é obrigatório!');
    }

    if (isNaN(produto.preco) || produto.preco < 0) {
        mensagensErro.push('O preço do produto precisa ser igual ou maior que 0!');
    }

    if (isNaN(produto.quantidade) || produto.quantidade <= 0) {
        mensagensErro.push('Quantidade inválida! Por favor, selecione uma quantidade maior ou igual a 1!');
    }

    // se tiver mensagens de erro para serem exibidas, mostramos todas de uma vez...
    if (mensagensErro.length > 0) {
        throw new Error(`${mensagensErro.join("\n")}`);
    }

    listaProdutos.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(listaProdutos));
}

/**
 * Remove um produto do Carrinho de Compras
 * @param {number} posicao Posição do item que deve ser removido da Lista de Produtos
 * @returns {void}
 */
export function removerProduto(posicao)
{
    if (posicao < 0 || posicao >= listaProdutos.length) {
        throw new Error('Posição informada para remoção é inválida!');
    }
    else {
        listaProdutos.splice(posicao, 1);
        localStorage.setItem('carrinho', JSON.stringify(listaProdutos));
    }
}

/**
 * Retorna a Lista de Produtos exibidos no Carrinho de Compras
 * @returns {Array<Produto>}
 */
export function getProdutos()
{
    return listaProdutos;
}

/**
 * Retorna o total da compra (soma de todos os itens do carrinho)
 * @returns {number}
 */
export function getTotalCompra()
{
    return listaProdutos.reduce((acumulador, produto) => acumulador + produto.getTotal(), 0);
}

/**
 * Retorna a quantidade total de itens adicionados ao carrinho de compras
 * @returns {number}
 */
export function getTotalQuantidade()
{
    return listaProdutos.reduce((acumulador, produto) => acumulador + produto.quantidade, 0);
}