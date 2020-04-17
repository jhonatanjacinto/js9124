import { enviarPedido } from "../controller/PedidoController.js";

$btnEnviarPedido.onclick = () => {
    try {
        let nomeCompleto = $inputNomeCompleto.value.trim();
        let email = $inputEmail.value.trim();
        let telefone = $inputTelefone.value.trim();
        let cep = $inputCep.value.trim();
        let endereco = $inputEndereco.value.trim();
        let numero = $inputNumero.value.trim();
        let complemento = $inputComplemento.value.trim();
        let bairro = $inputBairro.value.trim();
        let cidade = $inputCidade.value.trim();
        let estado = $selectEstado.value.trim();
        let observacoes = $inputObservacoes.value.trim();

        enviarPedido(nomeCompleto, email, telefone, cep, endereco, numero, complemento, bairro, cidade, estado, observacoes);
    }
    catch(erro) {
        alert(erro.message);
        console.error(erro);
    }
}


$inputCep.onchange = async () => {
    let cep = $inputCep.value.trim();
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();
    
    if (!dados.erro)
    {
        $inputEndereco.value = dados.logradouro;
        $inputCidade.value = dados.localidade;
        $selectEstado.value = dados.uf;
        $inputBairro.value = dados.bairro;

        $inputEndereco.disabled = false;
        $inputCidade.disabled = false;
        $selectEstado.disabled = false;
        $inputBairro.disabled = false;
        $inputNumero.disabled = false;
        $inputComplemento.disabled = false;
    }
    else
    {
        alert('CEP informado é inválido!');
    }
}