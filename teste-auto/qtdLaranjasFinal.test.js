const qtdLaranjasFinal = require("./qtdLaranjasFinal");

test("Qtd de laranjas vendidas, sendo 100 no inicio e sobrando 60 no final ", ()=> {
    expect(qtdLaranjasFinal(100, 60)).toBe(40);
})

test("Qtd de laranjas vendidas, sendo 250 no inicio e sobrando 180 no final ", ()=> {
    expect(qtdLaranjasFinal(250, 180)).toBe(70);
})

test("Qtd de laranjas vendidas, sendo 80 no inicio e sobrando 80 no final ", ()=> {
    expect(qtdLaranjasFinal(80, 80)).toBe(0);
})