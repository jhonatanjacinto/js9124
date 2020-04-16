import * as Carrinho from '../controller/CarrinhoController.js';
import { formataMoeda } from '../utils/formataMoeda.js';

$produtosTabela.onclick = (event) => {
    let indice = event.target.dataset.indice;
    if (indice != undefined) {
        Carrinho.removerProduto(indice);
        listarProdutos();
    }
}

listarProdutos();
export function listarProdutos()
{
    const listaDeProdutos = Carrinho.getProdutos();
    let linhasTabela = '';

    listaDeProdutos.forEach((produto, indice) => {
        linhasTabela += `
            <tr>
                <td>${produto.nome}</td>
                <td>${ formataMoeda(produto.preco) }</td>
                <td>${produto.quantidade}</td>
                <td>${ formataMoeda(produto.getTotal()) }</td>
                <td>
                    <button data-indice="${indice}" class="btn btn-danger">
                        X
                    </button>
                </td>
            </tr>
        `;
    });

    $produtosTabela.innerHTML = linhasTabela;
    $totalCompra.innerHTML = formataMoeda( Carrinho.getTotalCompra() );
    $quantidadeItens.innerHTML = Carrinho.getTotalQuantidade();
}