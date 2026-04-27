const palavra = "verde"

const palabrasTeste = "ledre"

//termo(palavra, palabrasTeste)

function termo(palavra, palabrasTeste){
    const letra = []

    for(let i = 0; i < palavra.length ; i++){
        if(! letra.some(l => Object.keys(l)[0] == palavra[i])
        ){
            letra.push({[palavra[i]]: 0})
        }
    }

    for(let i = 0; i < letra.length ; i++){
        let chave = Object.keys(letra[i])[0];
        for(let j = 0; j < palavra.length ; j++){
            if(chave == palavra[j]){
            letra[i][chave] = letra[i][chave] + 1;
        }
        }
    }

    console.log(letra)
    
    let certos = ["","","","",""];

    //certo
    for(let i = 0; i < palavra.length ; i++){
        if(palavra[i] == palabrasTeste[i]){
            if (valor(letra, palavra[i]) > 0) {
                certos[i] = "verde"
                diminui(letra, palavra[i])
            }
        }
    }

    //amarelo e errado
    for(let i = 0; i < palavra.length ; i++){
        if(palavra.includes(palabrasTeste[i])){
            if (certos[i] === "verde") continue;
            if(valor(letra, palabrasTeste[i]) > 0){
                certos[i] = "amarelo"
                diminui(letra, palabrasTeste[i])
            }else{
                certos[i] = certos[i] == "" ? "vermelho" : certos[i];
            }
        }else{
            certos[i] = "vermelho"
        }
    }
    console.log(certos)
}

//console.log(valor("u"))

//diminui("u")
//console.log(letra)

//Object.keys(letra[i])[0];

function diminui(letra, letr){
    const index = letra.findIndex(l => Object.keys(l)[0] == letr)
    letra[index][Object.keys(letra[index])[0]]--
}

function valor(letra, letr){
    const index = letra.findIndex(l => Object.keys(l)[0] == letr)
    return letra[index][Object.keys(letra[index])[0]];
}

// for(let i = 0; i < palavra.length ; i++){

//     if(palavra[i] == palabrasTeste[i]){
//         console.log("certo")
//     }else if(palavra.includes(palabrasTeste[i])) {
//         console.log("Lugar errado")
//         const qtdLetra = 0;
//         for(let j = 0; j < palavra.length ; j++){
//             if(palabrasTeste[j] == palabrasTeste[i]){
//             }
//         }
//     } else {
//         console.log("nao tem")
//     }
// }