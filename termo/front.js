import { termo, RESULTADO} from "./termo.js"
//const termo = require('./termo')

const tabuleiro = document.getElementById("tabuleiro");
const secreta = document.getElementById("secreto");



console.log(RESULTADO())


// cria uma linha com 5 inputs
function criarLinha() {
  const linha = document.createElement("div");
  linha.classList.add("linha");

  
  const palavra = []
  for (let i = 0; i < 5; i++) {
    
    const input = document.createElement("input");
    input.maxLength = 1;

    input.addEventListener("input", () => {
      if(input.value){
      console.log(input.value)
      palavra.push(input.value)
      }
      
      input.value = input.value.toUpperCase();

      if (input.value && input.nextElementSibling) {
        input.nextElementSibling.focus();
      }
    });
    
    input.addEventListener("keydown", (e) => {
      // voltar com backspace
      if (e.key === "Backspace" && input.previousElementSibling && !input.value) {
        palavra.pop();
        input.previousElementSibling.focus();        
      }

      // apertou ENTER → cria nova linha
      if (e.key === "Enter") {
        console.log(palavra)
        
        //termo(response, palavra.join(''))
        termo(secreta.value, palavra.join(''))

        criarLinha();
        const novaLinha = tabuleiro.lastChild;
        novaLinha.querySelector("input").focus();
      }
    });



    linha.appendChild(input);
  }

  tabuleiro.appendChild(linha);
}

// cria a primeira linha ao carregar
criarLinha();
