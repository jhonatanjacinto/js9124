// http = serve para criar servidores HTTP com node
import http from 'http';

const clientes = [
    { nome: 'Paulo Martins', idade: 26, sexo: 'M', renda: 3500 },
    { nome: 'Maria da Silva', idade: 32, sexo: 'F', renda: 4800 },
    { nome: 'José Pereira', idade: 52, sexo: 'M', renda: 1800 },
    { nome: 'Carlos Bragança', idade: 28, sexo: 'M', renda: 2880 },
    { nome: 'Fernanda Vaz', idade: 21, sexo: 'F', renda: 1600 },
    { nome: 'Josy Vasconcelos', idade: 30, sexo: 'F', renda: 3200 }
];

let tabelaHtml = `
    <table>
        <thead>
            <tr>
                <th>Nome do Cliente</th>
                <th>Idade do Cliente</th>
                <th>Sexo</th>
                <th>Renda</th>
            </tr>
        </thead>
        <tbody>
`;

clientes.forEach(cliente => {
    tabelaHtml += `
        <tr>
            <td>${cliente.nome}</td>
            <td>${cliente.idade}</td>
            <td>${cliente.sexo}</td>
            <td>${cliente.renda}</td>
        </tr>
    `;
});

tabelaHtml += `
        </tbody>
    </table>
`;

const appServer = http.createServer(function(requisicao, resposta) {
    resposta.writeHead(200, { 'Content-type' : 'text/html; charset="utf-8"' });

    if (requisicao.url === '/') {
        resposta.end(`
            <h1>Bem-vindo(a)</h1>
            <p>
                Para ver a lista de clientes, <a href="/clientes">clique aqui</a>.
            </p>
        `)
    }

    if (requisicao.url === '/clientes') {
        resposta.end(`
            <h1>Clientes</h1>
            <p>Veja na lista abaixo os dados dos seus clientes:</p>
            ${tabelaHtml}
        `);
    }
});

appServer.listen(8112);
console.log('Servidor rodando na url http://localhost:8112/');

