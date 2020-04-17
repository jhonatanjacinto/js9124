import { Pedido } from "../model/Pedido.js";
import { Produto } from "../model/Produto.js";
import { exibirCodigoPedido } from "../view/finalizacaoPedido.js";

const pedido = JSON.parse(localStorage.getItem('pedido')) || new Pedido();
// reseta o prototype do pedido para que ele volte a ter os métodos da classe Pedido
Object.setPrototypeOf(pedido, Pedido.prototype);

export function adicionarProduto(nome, preco, quantidade, foto)
{
    const produto = new Produto(nome, preco, quantidade, foto);

    if (!produto.nome) {
        throw new Error('Nome do produto é obrigatório!');
    }
    
    if (isNaN(produto.preco) || produto.preco <= 0) {
        throw new Error('Preço do Produto é inválido!');
    }

    if (isNaN(produto.quantidade) || produto.quantidade < 1) {
        throw new Error('Quantidade do produto deve ser igual ou maior que 1!');
    }

    let posicaoProduto = pedido.produtos.findIndex(produto => produto.nome === nome);

    if (posicaoProduto >= 0) {
        // produto já existe na lista, então atualiza
        pedido.produtos[posicaoProduto] = produto;
    }
    else {
        // adiciona o produto na lista
        pedido.produtos.push(produto);
    }

    localStorage.setItem('pedido', JSON.stringify(pedido));
}

export function removerProduto(posicao)
{
    if (posicao < 0 || posicao >= pedido.produtos.length) {
        throw new Error('Posição para exclusão é inválida!');
    }
    else {
        pedido.produtos.splice(posicao, 1);
        localStorage.setItem('pedido', JSON.stringify(pedido));
    }
}

/**
 * Retorna o OBJETO contendo as informações do pedido atual
 * @returns {Array<Produto>}
 */
export function getListaProdutos() 
{
    pedido.produtos = pedido.produtos.map(produto => Object.setPrototypeOf(produto, Produto.prototype));
    return pedido.produtos; 
}

/**
 * Retorna o Total do Pedido atual
 * @returns {number}
 */
export function getTotalCompra()
{
    return pedido.getTotal();
}

/**
 * 
 * @param {string} nomeCompleto Nome completo do pedido
 * @param {string} email E-mail do pedido
 * @param {string} telefone Telefone do pedido
 * @param {string} cep CEP do pedido
 * @param {string} endereco Endereço de entrega do pedido
 * @param {number} numero Número do endereço de entrega do pedido
 * @param {string} complemento Complemento do endereço
 * @param {string} bairro Bairro do endereço de entrega
 * @param {string} cidade Cidade do endereço de entrega
 * @param {string} estado Estado do endereço de entrega
 * @param {string} observacoes Observações adicionais sobre o pedido
 */
export async function enviarPedido(nomeCompleto, email, telefone, cep, endereco, numero, complemento, bairro, cidade, estado, observacoes)
{
    pedido.nomeCompleto = nomeCompleto;
    pedido.email = email;
    pedido.telefone = telefone;
    pedido.cep = cep;
    pedido.endereco = endereco;
    pedido.numero = numero;
    pedido.complemento = complemento;
    pedido.bairro = bairro;
    pedido.cidade = cidade;
    pedido.estado = estado;
    pedido.observacoes = observacoes;

    if (
        !pedido.nomeCompleto || !pedido.email || !pedido.telefone ||
        !pedido.cep || !pedido.endereco || !pedido.numero || !pedido.bairro ||
        !pedido.cidade || !pedido.estado
    ) {
        throw new Error('Por favor, preencha todos os campos obrigatórios!');
    }

    // Salvar os dados no servidor
    let dadosPedidoJson = JSON.stringify(pedido);
    const resposta = await fetch(`http://localhost:8888/salvar-pedido?pedido=${dadosPedidoJson}`);
    const respostaOperacao = await resposta.json();
    
    if (respostaOperacao.mensagem) {
        alert(respostaOperacao.mensagem);
    }

    localStorage.removeItem('pedido');
    
    // exibir o código do pedido para o usuário
    exibirCodigoPedido(pedido.id);

    // reload na página é opcional
    setTimeout(() => {
        window.location.reload();
    }, 10000);
}
