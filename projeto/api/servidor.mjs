import http from 'http';
import fs from 'fs';
import url from 'url';

const app = http.createServer((request, response) => {

    // Configuração da resposta do servidor NODE aqui..
    response.writeHead(200, {
        'Content-type' : 'application/json; charset=utf8',
        'Access-Control-Allow-Origin' : '*'
    });

    // colhemos as informações da URL acessada
    let pathname = url.parse(request.url).pathname;

    if (pathname === '/') {
        response.end('Api da aplicação de Pizzaria.');
    }

    /* @url /lista-produtos : retornar a lista de produtos do arquivo produtos.json */
    if (pathname === '/lista-produtos') {
        let listaDeProdutosJson = fs.readFileSync('./db/produtos.json', 'utf8');
        response.end(listaDeProdutosJson);
    }

    /* @url /lista-pedidos : retornar a lista de pedidos do arquivo pedidos.json */
    if (pathname === '/lista-pedidos') {
        let listaDePedidosJson = fs.readFileSync('./db/pedidos.json', 'utf8');
        response.end(listaDePedidosJson);
    }

    /* @url /status-pedido?codigo=CODIGO_PEDIDO : retornar o status do pedido para o código enviado */
    if (pathname === '/status-pedido')
    {
        let stringCodigo = url.parse(request.url, true).query.codigo;
        const pedidosString = fs.readFileSync('./db/pedidos.json', 'utf8');
        const listaDePedidos = JSON.parse(pedidosString);

        const pedidoEncontrado = listaDePedidos.find(pedido => pedido.id == stringCodigo);
        if (pedidoEncontrado) {
            const dadosResposta = JSON.stringify({ statusDoPedido : pedidoEncontrado.status });
            response.end(dadosResposta);
        }
        else {
            // statusDoPedido = 0 | Pedido não existe na base de dados
            const dadosResposta = JSON.stringify({ statusDoPedido : 0 });
            response.end(dadosResposta);
        }
    }

    /* @url /salvar-pedido?pedido=DADOS_PEDIDO : salva as informações do pedido no servidor */
    if (pathname === '/salvar-pedido')
    {
        let stringDadosPedido = url.parse(request.url, true).query.pedido;
        const pedidosJson = fs.readFileSync('./db/pedidos.json', 'utf8');
        const listaDePedidos = JSON.parse(pedidosJson);
        const dadosPedido = JSON.parse(stringDadosPedido);

        listaDePedidos.push(dadosPedido);
        const stringPedidosJson = JSON.stringify(listaDePedidos);

        fs.writeFileSync('./db/pedidos.json', stringPedidosJson, 'utf8');

        const resposta = { mensagem: 'Pedido salvo com sucesso!' };
        response.end(JSON.stringify(resposta));
    }

});

app.listen(8888);
console.log('Servidor da api está rodando na url http://localhost:8888/');