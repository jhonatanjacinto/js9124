import { adicionarContato } from "../controller/ContatoController.js";
import { listarContatosTabela } from "./tabela.js";


btnSalvar.onclick = () => {
    try {
        let nome = inputNome.value.trim();
        let telefone = inputTelefone.value.trim();

        adicionarContato(nome, telefone);
        listarContatosTabela();

        inputNome.value = '';
        inputTelefone.value = '';
    } 
    catch (erro) {
        alert(erro.message);
    }
}