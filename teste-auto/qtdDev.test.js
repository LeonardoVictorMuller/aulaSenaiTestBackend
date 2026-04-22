const qtdDev = require("./qtdDev");

test("Qtd de dev tento 10 clt, 5 estagiario e 3 pj: ", ()=> {
    expect(qtdDev(10, 5, 3)).toBe(18);
})

test("Qtd de dev tento 25 clt, 10 estagiario e 15 pj: ", ()=> {
    expect(qtdDev(25, 10, 15)).toBe(50);
})

test("Qtd de dev tento 8 clt, 2 estagiario e 0 pj: ", ()=> {
    expect(qtdDev(8, 2, 0)).toBe(10);
})