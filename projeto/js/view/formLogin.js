
$btnLogin.onclick = async () => {
    let login = $inputLogin.value.trim();
    let senha = $inputSenha.value.trim();

    if (login === 'caelum' && senha === 'js12') {
        const resposta = await fetch('http://localhost:8888/lista-pedidos');
        const listaDePedidos = await resposta.json();
        let linhasTabela = '';

        listaDePedidos.forEach(pedido => {
            linhasTabela += `
                <tr>
                    <td>${pedido.id}</td>
                    <td>${pedido.nomeCompleto}</td>
                    <td>${pedido.email}</td>
                    <td>${pedido.telefone}</td>
                    <td>
                        ${pedido.endereco}, ${pedido.numero} ${pedido.complemento}<br>
                        ${pedido.bairro} - ${pedido.cidade} / ${pedido.estado}
                    </td>
                    <td>${pedido.status}</td>
                </tr>
            `;
        });

        let tabela = `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Nome</td>
                        <td>E-mail</td>
                        <td>Telefone</td>
                        <td>Endereço</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    ${linhasTabela}
                </tbody>
            </table>
        `;
        $divListaPedidos.innerHTML = tabela;
    }
    else {
        alert('Utilize "caelum" como usuário e "js12" como senha para ter acesso!');
    }
}