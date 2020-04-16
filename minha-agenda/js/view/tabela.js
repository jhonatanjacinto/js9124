import { getContatos, excluirContato } from "../controller/ContatoController.js";

listarContatosTabela();
export function listarContatosTabela()
{
    const todosOsContatos = getContatos();
    let linhasTabela = '';

    todosOsContatos.forEach((contato, indice) => {
        linhasTabela += `<tr>
            <td>${contato.nome}</td>
            <td>${contato.telefone}</td>
            <td>
                <button data-indice="${indice}" class="btn btn-danger">
                    <i style="pointer-events: none;" class="fas fa-times"></i>
                </button>
            </td>
        </tr>
        `;
    });

    tabelaContatos.innerHTML = linhasTabela;
}

tabelaContatos.onclick = (event) => {
    try {
        let indice = event.target.dataset.indice;
        if (indice != undefined) {
            excluirContato(indice);
            listarContatosTabela();
        }
    } 
    catch (erro) {
        alert(erro.message);
    }
}