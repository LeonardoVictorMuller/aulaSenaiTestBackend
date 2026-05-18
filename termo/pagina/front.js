import { termo } from "../termo.js";
import { RESULTADO, DICA } from "../palavraSecreta.js";

const tabuleiro = document.getElementById("tabuleiro");
const mensagemContainer = document.getElementById("mensagem-container");
const dicaElement = document.getElementById("dica");

let palavraSecreta = RESULTADO();
let dica = DICA();

dicaElement.textContent = dica;

console.log("Palavra secreta:", palavraSecreta);
console.log("Dica secreta: ", dica);

const MAX_TENTATIVAS = 3;
let tentativas = 0;

criarLinha();

function mostrarMensagem(texto, tipo) {
    mensagemContainer.innerHTML = `<div class="mensagem ${tipo}">${texto}</div>`;
    
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        mensagemContainer.innerHTML = "";
    }, 3000);
}

function reiniciarJogo() {
    tabuleiro.innerHTML = "";
    mensagemContainer.innerHTML = "";
    tentativas = 0;
    
    // Busca uma nova palavra
    fetch(`http://127.0.0.1:3000/palavra`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json())
        .then(dados => {
            palavraSecreta = dados[0]?.["palavra"];
            dica = dados[0]?.["dica"];
            
            dicaElement.textContent = dica;
            console.log("Nova palavra secreta:", palavraSecreta);
            console.log("Nova dica secreta: ", dica);
            
            criarLinha();
        })
        .catch(err => {
            console.error("Erro ao buscar nova palavra:", err);
            mostrarMensagem("Erro ao carregar nova palavra!", "erro");
        });
}

function criarLinha() {

    // impede criar mais linhas que o permitido
    if (tentativas >= MAX_TENTATIVAS) {
        mostrarMensagem(`Você perdeu! A palavra era: ${palavraSecreta}`, "derrota");
        
        // Cria botão para nova palavra
        const btnNovaArquivo = document.createElement("button");
        btnNovaArquivo.textContent = "Nova Palavra";
        btnNovaArquivo.classList.add("btn-nova-palavra");
        btnNovaArquivo.addEventListener("click", reiniciarJogo);
        mensagemContainer.appendChild(btnNovaArquivo);
        return;
    }

    const linha = document.createElement("div");
    linha.classList.add("linha");

    for (let i = 0; i < 5; i++) {

        const input = document.createElement("input");

        input.maxLength = 1;

        input.classList.add("letra");

        // deixa sempre maiúsculo
        input.addEventListener("input", () => {

            input.value = input.value.toUpperCase();

            // vai para o próximo input
            if (input.value && input.nextElementSibling) {
                input.nextElementSibling.focus();
            }
        });

        input.addEventListener("keydown", (e) => {

            // voltar com backspace
            if (e.key === "Backspace") {

                // se vazio, volta
                if (!input.value && input.previousElementSibling) {
                    input.previousElementSibling.focus();
                }
            }

            // ENTER = confirmar palavra
            if (e.key === "Enter") {

                const inputs = linha.querySelectorAll("input");

                // pega a palavra digitada
                const palavra = [...inputs]
                    .map(i => i.value)
                    .join("")
                    .toLowerCase();

                // impede enviar incompleto
                if (palavra.length < 5) {
                    mostrarMensagem("Digite 5 letras", "aviso");
                    return;
                }

                console.log("Tentativa:", palavra);

                // resultado das cores
                const cores = termo(palavraSecreta, palavra);

                console.log(cores);

                // pinta os quadrados
                inputs.forEach((input, index) => {
                    input.style.backgroundColor = cores[index];
                    input.disabled = true;
                });

                tentativas++;

                // venceu
                if (palavra === palavraSecreta) {
                    mostrarMensagem("🎉 Você ganhou!", "vitoria");
                    
                    // Cria botão para nova palavra
                    const btnNovaArquivo = document.createElement("button");
                    btnNovaArquivo.textContent = "Nova Palavra";
                    btnNovaArquivo.classList.add("btn-nova-palavra");
                    btnNovaArquivo.addEventListener("click", reiniciarJogo);
                    mensagemContainer.appendChild(btnNovaArquivo);
                    return;
                }

                // perdeu
                if (tentativas >= MAX_TENTATIVAS) {
                    mostrarMensagem(`Você perdeu! A palavra era: ${palavraSecreta}`, "derrota");
                    
                    // Cria botão para nova palavra
                    const btnNovaArquivo = document.createElement("button");
                    btnNovaArquivo.textContent = "Nova Palavra";
                    btnNovaArquivo.classList.add("btn-nova-palavra");
                    btnNovaArquivo.addEventListener("click", reiniciarJogo);
                    mensagemContainer.appendChild(btnNovaArquivo);
                    return;
                }

                // cria nova linha
                criarLinha();

                // foca no primeiro input da nova linha
                const novaLinha = tabuleiro.lastChild;
                novaLinha.querySelector("input").focus();
            }
        });

        linha.appendChild(input);
    }

    tabuleiro.appendChild(linha);
}