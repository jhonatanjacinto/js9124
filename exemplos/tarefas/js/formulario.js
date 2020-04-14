
btnAdicionar.onclick = () => {
    let tarefa = campoTarefa.value.trim();

    if (tarefa == '') {
        alert('Por favor, digite uma tarefa válida!')
    }
    else {
        // adicionar a tarefa digitada na lista de tarefas
        
        // exibir a lista de tarefas
    }

    campoTarefa.value = '';
    campoTarefa.focus();
}