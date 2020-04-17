
export function exibirCodigoPedido(codigo)
{
    $divFinalizacaoPedido.innerHTML = `
        <div class="alert alert-success text-center">
            <span>código do pedido:</span>
            <h4 class="alert-heading display-3">${codigo}</h4>
            <hr>
            Seu pedido foi enviado com sucesso.
        </div>    
    `;
}