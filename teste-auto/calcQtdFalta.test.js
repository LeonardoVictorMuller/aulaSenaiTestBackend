const calcQtdFalta = require("./calcQtdFalta");

test("Qtd que falta para o mes, sendo 5000 o custo do mes e 1200 quanto recebeu no dia ", ()=> {
    expect(calcQtdFalta(5000, 1200)).toBe(3800);
})

test("Qtd que falta para o mes, sendo 3000 o custo do mes e 3000 quanto recebeu no dia ", ()=> {
    expect(calcQtdFalta(3000, 3000)).toBe(0);
})

test("Qtd que falta para o mes, sendo 4500 o custo do mes e 2000 quanto recebeu no dia ", ()=> {
    expect(calcQtdFalta(4500, 2000)).toBe(2500);
})