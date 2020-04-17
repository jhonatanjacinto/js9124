import { formataMoeda } from "../utils/formataMoeda.js";
import { adicionarProduto } from "../controller/PedidoController.js";
import { exibirProdutosPedido } from "./tabelaSeusProdutos.js";

$btnAdicionarProduto.onclick = () => {
    try 
    {
        // coleta os dados do formulário
        let indiceSelecionado = $selectProduto.selectedIndex;
        let nome = $selectProduto.value;
        let preco = Number($selectProduto.options[indiceSelecionado].dataset.preco);
        let foto = $selectProduto.options[indiceSelecionado].dataset.foto;
        let quantidade = parseInt($inputQuantidade.value);

        // passa os dados pro controller adicionar ao pedido
        adicionarProduto(nome, preco, quantidade, foto);
        // exibe os dados do pedido na tabela
        exibirProdutosPedido();

        // limpa os campos do formulário
        $selectProduto.value = 0;
        $inputQuantidade.value = 1;
    }
    catch(erro) {
        alert(erro.message);
        console.error(erro);
    }
}


carregarProdutos();
async function carregarProdutos()
{
    try 
    {
        const resposta = await fetch('http://localhost:8888/lista-produtos');
        const listaDeProdutos = await resposta.json();
        console.log('Lista de Produtos: ', listaDeProdutos);

        let opcoes = '';
        listaDeProdutos.forEach(produto => {
            opcoes += `
                <option value="${produto.nome}" data-preco="${produto.preco}" data-foto="${produto.foto}">
                    ${produto.nome} - ${formataMoeda(produto.preco)}
                </option>
            `;
        });

        $selectProduto.innerHTML = opcoes;
    }
    catch(erro) {
        alert('Não foi possível carregar a lista de produtos!');
        console.error(erro);
    }
}

