
$btnVerificarStatus.onclick = async () => {
    let codigo = $inputCodigo.value.trim();

    if (codigo == "") {
        alert('Por favor, preencha o campo com um código válido!');
    }
    else {
        const resposta = await fetch(`http://localhost:8888/status-pedido?codigo=${codigo}`);
        const pedido = await resposta.json();

        if (pedido.statusDoPedido == 0) {
            alert('Pedido informado não existe!');
        }
        else if (pedido.statusDoPedido == 1) {
            $divFinalizacaoPedido.innerHTML = `
                <div class="alert alert-warning text-center">
                    <span>status:</span>
                    <h4 class="alert-heading display-3">EM ANDAMENTO</h4>
                    <hr>
                    Seu pedido ainda está sendo processado. Por favor, aguarde.
                </div>
            `;
        }
        else {
            $divFinalizacaoPedido.innerHTML = `
                <div class="alert alert-success text-center">
                    <span>status:</span>
                    <h4 class="alert-heading display-3">FINALIZADO</h4>
                    <hr>
                    Seu pedido já foi entregue no endereço informado.
                </div>
            `;
        }
    }
}