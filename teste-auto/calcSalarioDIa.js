function calcSalarioDia(sm, qtdD){
    let a = []
    a[0] = parseFloat((sm/qtdD).toFixed(2))
    a[1] = parseFloat((sm/qtdD*5).toFixed(2))
    return a
}

 module.exports = calcSalarioDia