const calcularPontos = require("./peba.js");

test("Teste de 4 vitorias e 2 empates: ", ()=> {
    expect(calcularPontos(4, 2)).toBe(14);
})