export function converteMetroEmPes(m){ return m*3.281 }
export function convertePesEmMetro(p){ return p/3.281 }

export function converteKmEmMilha(km) { return km / 1.60934; }
export function converteMilhaEmKm(milha) { return milha * 1.60934; }

export function converteCmEmPolegada(cm) { return cm / 2.54; }
export function convertePolegadaEmCm(pol) { return pol * 2.54; }

export function converteKgEmLibra(kg) { return kg * 2.20462; }
export function converteLibraEmKg(lb) { return lb / 2.20462; }

export function converteFahrenheitEmCelsius(f) { return (f - 32) * 5 / 9; }
export function converteCelsiusEmFahrenheit(c) { return (c * 9 / 5) + 32; }

export function converteKelvinEmCelsius(k) { return k - 273.15; }
export function converteCelsiusEmKelvin(c) { return c + 273.15; }

export function converteRealEmDolar(brl) { return brl / 5.00; }
export function converteDolarEmReal(usd) { return usd * 5.00; }

export function converteRealEmEuro(brl) { return brl / 5.50; }
export function converteEuroEmReal(eur) { return eur * 5.50; }

export function converteRealEmWon(brl) { return brl * 270; }
export function converteWonEmReal(krw) { return krw / 270; }

export function converteHorasEmMs(horas) { return horas * 3600000; }
export function converteMsEmHoras(ms) { return ms / 3600000; }

//export { converteMetroEmPes, convertePesEmMetro};