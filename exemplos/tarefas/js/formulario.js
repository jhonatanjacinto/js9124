import { adicionarTarefa } from "./tarefas.js";
import { exibirTarefas } from "./exibidor.js";

btnAdicionar.onclick = () => {
    let tarefa = campoTarefa.value.trim();

    if (tarefa == '') {
        alert('Por favor, digite uma tarefa válida!')
    }
    else {
        // adicionar a tarefa digitada na lista de tarefas
        adicionarTarefa(tarefa);
        // exibir as tarefas pro usuário
        exibirTarefas();
    }

    campoTarefa.value = '';
    campoTarefa.focus();
}