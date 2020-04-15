import { adicionarProduto } from "../controller/CarrinhoController.js";

$btnForm.onclick = () => {
    adicionarProduto('Teclado', 150, 5);
}