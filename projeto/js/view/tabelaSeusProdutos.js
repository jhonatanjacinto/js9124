import { getListaProdutos, removerProduto, getTotalCompra } from "../controller/PedidoController.js";
import { formataMoeda } from "../utils/formataMoeda.js";

exibirProdutosPedido();
export function exibirProdutosPedido()
{
    const listaProdutos = getListaProdutos();
    let linhasTabela = '';

    listaProdutos.forEach((produto, indice) => {
        linhasTabela += `
            <tr>
                <td width="10%">
                    <img src="imagens/pizzas/${produto.foto}" class="w-100">
                </td>
                <td>
                    ${produto.nome} <br>
                    <button data-posicao="${indice}" class="btn btn-danger btn-sm">
                        Remover
                    </button>
                </td>
                <td>${produto.quantidade}</td>
                <td>${formataMoeda(produto.preco)}</td>
                <td>${formataMoeda(produto.getSubtotal())}</td>
            </tr>
        `;
    });

    $tableProdutos.innerHTML = linhasTabela;
    $tdTotalPedido.innerHTML = formataMoeda(getTotalCompra());
}

$tableProdutos.onclick = (event) => {
    let posicao = event.target.dataset.posicao;
    if (posicao !== undefined) {
        removerProduto(posicao);
        exibirProdutosPedido();
    }
}