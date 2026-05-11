const response = await fetch(`http://127.0.0.1:3000/palavra`, {
    method: "GET",
    headers : {"Content-Type" : "application/json"},
    //body : JSON.stringify({})
});

const dados = await response.json();

export const RESULTADO = () =>{
    return dados[0]?.["palavra"];
}