/* 
document = usado para acessar os elementos da página html

querySelector = usado para selecionar um elemento da página html

id = identificador unico

getElementById = usado para selecionar um elemento da página html pelo id
*/

let listaSorteados = [];
let qtdLimite = 10;
let chute = '';
let tentativas = 1;
let secretNumber = geraNumero();

function exibirMensagem(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMsgInicial() {
    exibirMensagem('h1', 'Jogo do número secreto.');
    exibirMensagem('p', 'Escolha um número entre 1 e 10:');
}

exibirMsgInicial();

function verificarChute() {
    chute = parseInt(document.querySelector('.container__input').value);
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
    let mensagem = '';

    if (chute == secretNumber) {
        exibirMensagem('h1', 'Parabéns!');
        mensagem = `O número secreto era ${secretNumber} e você acertou com apenas ${tentativas} ${palavraTentativa}`
        exibirMensagem('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > secretNumber) {
        mensagem = `O chute foi maior que o número secreto!`
        exibirMensagem('p', mensagem);
    } else {
        mensagem = `O chute foi menor que o número secreto!`
        exibirMensagem('p', mensagem);
    }

    tentativas++;
    clearInput();
}

function geraNumero() {
    let numero = parseInt(Math.random() * qtdLimite + 1);
    qtdElementos = listaSorteados.length;

    if (qtdElementos == qtdLimite) {
        listaSorteados = [];
    }

    if (listaSorteados.includes(numero)) {
        return geraNumero(); // Recursividade chamar a função dentro da mesma
    } else {
        listaSorteados.push(numero);
        return numero;
    }
}

function clearInput() {
    chute = document.querySelector('input').value = '';
}

function reiniciarJogo() {
    secretNumber = geraNumero();
    exibirMsgInicial();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}