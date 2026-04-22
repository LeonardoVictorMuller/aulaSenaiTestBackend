const calcSalarioDia = require("./calcSalarioDIa");

test("Qtd que recebe por dia, sendo 3000 o salario mensal e trabalhando 20 dias ", ()=> {
    expect(calcSalarioDia(3000, 20)[0]).toBe(150);
    expect(calcSalarioDia(3000, 20)[1]).toBe(750);
})
test("Qtd que recebe por dia, sendo 4500 o salario mensal e trabalhando 22 dias ", ()=> {
    expect(calcSalarioDia(4500, 22)[0]).toBe(204.55);
    expect(calcSalarioDia(4500, 22)[1]).toBe(1022.73);
})
test("Qtd que recebe por dia, sendo 2000 o salario mensal e trabalhando 10 dias ", ()=> {
    expect(calcSalarioDia(2000, 10)[0]).toBe(200);
    expect(calcSalarioDia(2000, 10)[1]).toBe(1000);
})