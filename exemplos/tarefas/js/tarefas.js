const listaTarefas = [];

/**
 * Adiciona uma tarefa na lista de tarefas da aplicação
 * @param {string} tarefa Nome da tarefa a ser adicionada na lista de tarefas
 * @returns {void}
 */
export function adicionarTarefa(tarefa)
{
    let posicao = listaTarefas.findIndex(itemDaLista => itemDaLista.localeCompare(tarefa, undefined, {sensitivity: 'base'}) === 0);

    // se a posição for >= 0 a tarefa já existe na lista
    if (posicao >= 0) {
        alert('Tarefa já existe na sua lista!');
    }
    else {
        listaTarefas.push(tarefa);
        alert('Tarefa adicionada com sucesso!');
    }
}

/**
 * Retorna a lista de tarefas salvas em memória na aplicação
 * @returns {Array<string>}
 */
export function getTarefas()
{
    return listaTarefas;
}

/**
 * Exclui um item da lista de tarefas da aplicação com base na posição informada
 * @param {number} posicao Posição do item na lista de tarefas que será excluído
 * @returns {void}
 */
export function excluirTarefa(posicao)
{
    if (posicao < 0 || posicao >= listaTarefas.length) {
        alert('Posição inválida para exclusão!');
    }
    else {
        listaTarefas.splice(posicao, 1);
        alert('Tarefa removida com sucesso!');
    }
}