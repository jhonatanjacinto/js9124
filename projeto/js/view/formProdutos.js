import { formataMoeda } from "../utils/formataMoeda.js";

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