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

    /* @url /salvar-pedido?pedido=DADOS_PEDIDO : salva as informações do pedido no servidor */

});

app.listen(8888);
console.log('Servidor da api está rodando na url http://localhost:8888/');