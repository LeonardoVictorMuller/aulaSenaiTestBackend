const pePequeno = require("./pePequeno.js");

test("Teste calcula o preco total para quantidade 10 de sapato de preco R$120", ()=> {
    expect(pePequeno(120, 10)).toBe(1200)
})

test("Teste calcula o preco total para quantidade 5 de sapato de preco R$85", ()=> {
    expect(pePequeno(85, 5)).toBe(425)
})

test("Teste calcula o preco total para quantidade 3 de sapato de preco R$199,90", ()=> {
    expect(pePequeno(199.90, 3)).toBe(599.70)
})
