import { termo } from "../termo.js";
import { RESULTADO, DICA } from "../palavraSecreta.js";

const tabuleiro = document.getElementById("tabuleiro");

const palavraSecreta = RESULTADO();
const dica = DICA();

const fraseDica = document.getElementById("dica");

console.log("Palavra secreta:", palavraSecreta);
console.log("Dica secreta: ", dica);

fraseDica.textContent = dica;

const MAX_TENTATIVAS = 3;
let tentativas = 0;

criarLinha();

function criarLinha() {

    // impede criar mais linhas que o permitido
    if (tentativas >= MAX_TENTATIVAS) {
        alert("Fim de jogo!");
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
                    alert("Digite 5 letras");
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
                    alert("Você ganhou!");
                    return;
                }

                // perdeu
                if (tentativas >= MAX_TENTATIVAS) {
                    alert(`Você perdeu! Palavra: ${palavraSecreta}`);
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