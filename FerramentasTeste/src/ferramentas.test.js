import { converteMetroEmPes, convertePesEmMetro,
    converteKmEmMilha, converteMilhaEmKm,
    converteCmEmPolegada, convertePolegadaEmCm,
    converteKgEmLibra, converteLibraEmKg,
    converteFahrenheitEmCelsius, converteCelsiusEmFahrenheit,
    converteKelvinEmCelsius, converteCelsiusEmKelvin,
    converteRealEmDolar, converteDolarEmReal,
    converteRealEmEuro, converteEuroEmReal,
    converteRealEmWon, converteWonEmReal,
    converteHorasEmMs, converteMsEmHoras,
} from "./ferramentas";

test("Quantos pes da 1200 metros ", ()=> {
    expect(converteMetroEmPes(1200)).toBe(3937.2000000000003);
})

test("Quantos metros da 1200 pes", ()=> {
    expect(convertePesEmMetro(1200)).toBe(365.74215178299295);
})

// --- Metros e Pés ---
test("Quantos pes da 1200 metros", ()=> {
    expect(converteMetroEmPes(1200)).toBeCloseTo(3937.20);
})

test("Quantos metros da 1200 pes", ()=> {
    expect(convertePesEmMetro(1200)).toBeCloseTo(365.74);
})

// --- Km e Milhas ---
test("Converte 10 quilômetros para milhas", ()=> {
    expect(converteKmEmMilha(10)).toBeCloseTo(6.2137);
})

test("Converte 10 milhas para quilômetros", ()=> {
    expect(converteMilhaEmKm(10)).toBeCloseTo(16.0934);
})

// --- Cm e Polegadas ---
test("Converte 50 centímetros para polegadas", ()=> {
    expect(converteCmEmPolegada(50)).toBeCloseTo(19.685);
})

test("Converte 10 polegadas para centímetros", ()=> {
    expect(convertePolegadaEmCm(10)).toBeCloseTo(25.4);
})

// --- Kg e Libras ---
test("Converte 5 quilogramas para libras", ()=> {
    expect(converteKgEmLibra(5)).toBeCloseTo(11.0231);
})

test("Converte 10 libras para quilogramas", ()=> {
    expect(converteLibraEmKg(10)).toBeCloseTo(4.5359);
})

// --- Temperatura ---
test("Converte 100 Fahrenheit para Celsius", ()=> {
    expect(converteFahrenheitEmCelsius(100)).toBeCloseTo(37.7778);
})

test("Converte 0 Celsius para Fahrenheit", ()=> {
    expect(converteCelsiusEmFahrenheit(0)).toBe(32);
})

test("Converte 300 Kelvin para Celsius", ()=> {
    expect(converteKelvinEmCelsius(300)).toBeCloseTo(26.85);
})

test("Converte 20 Celsius para Kelvin", ()=> {
    expect(converteCelsiusEmKelvin(20)).toBeCloseTo(293.15);
})

// --- Moedas (Taxas Fixas) ---
test("Converte 50 Reais para Dólares (Cotação 5.00)", ()=> {
    expect(converteRealEmDolar(50)).toBe(10);
})

test("Converte 10 Dólares para Reais (Cotação 5.00)", ()=> {
    expect(converteDolarEmReal(10)).toBe(50);
})

test("Converte 55 Reais para Euros (Cotação 5.50)", ()=> {
    expect(converteRealEmEuro(55)).toBe(10);
})

test("Converte 10 Euros para Reais (Cotação 5.50)", ()=> {
    expect(converteEuroEmReal(10)).toBe(55);
})

test("Converte 10 Reais para pila dos k-pop (Won - Cotação 270)", ()=> {
    expect(converteRealEmWon(10)).toBe(2700);
})

test("Converte 2700 Won para Reais (Cotação 270)", ()=> {
    expect(converteWonEmReal(2700)).toBe(10);
})

// --- Tempo ---
test("Converte 2 horas para milissegundos", ()=> {
    expect(converteHorasEmMs(2)).toBe(7200000);
})

test("Converte 3600000 milissegundos para horas", ()=> {
    expect(converteMsEmHoras(3600000)).toBe(1);
})