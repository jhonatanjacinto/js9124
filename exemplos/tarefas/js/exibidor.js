import { getTarefas, excluirTarefa } from "./tarefas.js";

/**
 * Exibe as tarefas salvas em memória na interface HTML para o usuário
 * @returns {void}
 */
export function exibirTarefas()
{
    const tarefas = getTarefas();
    let listaItens = '';

    tarefas.forEach((item, indice) => {
        listaItens += `
            <li>
                ${item}
                <button data-posicao="${indice}">
                    Excluir
                </button>
            </li>
        `;
    });

    exibidor.innerHTML = `
        Sua lista de tarefas possui os seguintes itens: <br>
        <ol>
            ${listaItens}
        </ol>
    `;
}

exibidor.onclick = (event) => {
    if (event.target.tagName === 'BUTTON') 
    {   
        // dataset.posicao = data-posicao (no html)
        let posicao = event.target.dataset.posicao;
        excluirTarefa(posicao);
        exibirTarefas();
    }
}