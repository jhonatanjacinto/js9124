import * as Carrinho from "../controller/CarrinhoController.js";
import { formataMoeda } from "../utils/formataMoeda.js";
import { listarProdutos } from "./tabela.js";

$btnForm.onclick = () => {
    let nome = $produto.value.trim();
    let preco = Number($valorUnitario.value.trim().replace(/(R\$ ?|\.)/g, "").replace(',', "."));
    let quantidade = parseInt($quantidade.value.trim());
    
    try {
        Carrinho.adicionarProduto(nome, preco, quantidade);
        listarProdutos();
        $produto.value = '';
        $quantidade.value = 1;
        $valorUnitario.value = "R$ 0,00";
    }
    catch(erro) {
        alert(erro.message);
        console.error(erro);
    }
}

$produto.onchange = () => {
    let indice = $produto.selectedIndex;
    let preco = $produto.options[indice].dataset.preco;
    if (preco !== undefined) {
        $valorUnitario.value = formataMoeda(preco);
    }
    else {
        $valorUnitario.value = 'R$ 0,00';
    }
}