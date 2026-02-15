
let states = {
    modo: 'esperandoNumero',
    temDecimal: false,
    caractereDecimalPendente: true,
    funcao: 'permitir',
    resultado: false,
    errorDisplay: false


};

const capturarNum = (num) => {
    const numero = num.innerHTML
    executa(numero)
}

const display = (valor) => {
    const tela = document.querySelector("#resp")

    if (tela.innerHTML == '') {
        tela.innerText = valor
    } else {

        tela.innerText += valor
    }

}

const processaEntrada = (entrada) => {
    const valor = entrada
    const operadores = ['+', '-', 'x', '/']
    const decimal = '.'

    let verificaOperador = operadores.filter((element) => valor == element)
    let verificaDecimal = valor == decimal ? true : false;


    if (verificaOperador.length > 0) {
        if (states.modo == 'operador') {
            states.modo = 'operador'
            states.funcao = 'substituir'

        } else if (states.modo == 'numero' && states.caractereDecimalPendente == true && states.errorDisplay == false) {
            states.modo = 'operador'
            states.funcao = 'permitir'
            states.temDecimal = false
            states.resultado = false

        } else {
            states.funcao = 'ignorar'
        }
    } else if (verificaDecimal && states.errorDisplay == false) {
        if (states.temDecimal == true || states.resultado == true) {
            states.funcao = 'ignorar'

        } else if (states.temDecimal == false && states.modo == 'numero') {
            states.modo = 'numero'
            states.temDecimal = true
            states.caractereDecimalPendente = false
            states.funcao = 'permitir'

        } else {
            states.temDecimal = false
            states.funcao = 'ignorar'

        }

    } else {
        states.modo = 'numero'
        states.funcao = 'permitir'

        /*substitui o if */
        states.caractereDecimalPendente == false && (states.caractereDecimalPendente = true)
        states.resultado == true && (states.resultado = false, states.funcao = 'limparEadicionar')
        states.errorDisplay == true && (states.errorDisplay = false, states.funcao = 'limparEadicionar')
    }


    return resultado = {
        valor: entrada,
        modo: states.modo,
        decimal: states.temDecimal,
        decimalPendende: states.caractereDecimalPendente,
        funcao: states.funcao,
        resultado: states.resultado
    };

}

const executa = (valor) => {
    const entrada = processaEntrada(valor)

    if (entrada.decimal == true && entrada.funcao == 'ignorar' || entrada.decimal == false && entrada.funcao == 'ignorar' || entrada.errorDisplay == true) {
        return
    }

    if (entrada.modo == 'operador') {
        if (entrada.funcao == 'permitir') {
            display(entrada.valor)

        } else if (entrada.funcao == 'substituir') {

            const tela = document.querySelector("#resp")
            let mudarOperador = tela.innerHTML.split('')
            let idx = mudarOperador.length
            mudarOperador[idx - 1] = entrada.valor
            tela.innerText = mudarOperador.join('')
            return

        } else {
            return
        }

    } else if (entrada.decimal == true && entrada.funcao == 'permitir') {
        display(entrada.valor)

    } else {

        if (entrada.funcao == 'limparEadicionar') {
            const tela = document.querySelector("#resp").innerHTML = ''
            display(entrada.valor)

        } else {
            display(entrada.valor)
        }

    }
}

const formatarExpressao = () => {
    const tela = document.querySelector("#resp").innerText
    const expressao = tela.match(/\d+[.]\d+|\d+|[+x*/-]/g)
    const elementosExpressao = []


    if (states.modo == 'operador' || states.caractereDecimalPendente == false || states.errorDisplay || !expressao) {
        return
    }


    expressao.forEach(element => {
        if (element.match(/\d+[.]\d+|\d+/)) {
            elementosExpressao.push(Number(element))

        } else if (element.match(/[+x*/-]/)) {
            if (element == "x") {
                element = '*'
                elementosExpressao.push(element)

            } else {
                elementosExpressao.push(element)
            }
        }
    });

    const expressaoReversa = []
    const operadores = []
    let marcaNum = 0

    elementosExpressao.forEach(element => {
        if (String(element).match(/[+x*/-]/)) {
            operadores.push(element)

        } else {
            expressaoReversa.push(element)
            marcaNum++
            if (operadores.length > 0 && marcaNum > 0) {
                expressaoReversa.push(operadores.pop())
                marcaNum = 0

            }
        }
    })
    while (operadores.length > 0) {
        expressaoReversa.push(operadores.pop())
    }
    executaExpressao(expressaoReversa)
}

const executaExpressao = (expressao) => {
    const operacao = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b

    }

    const stack = []

    expressao.forEach(element => {
        if (typeof element === 'number') {
            stack.push(element)
        } else {
            const b = stack.pop()
            const a = stack.pop()

            const resultado = operacao[element](a, b);

            if (isFinite(resultado)) {
                stack.push(resultado)
            } else {
                stack.push('ERROR')
                states.errorDisplay = true
            }

        }
    })
    states.resultado = true
    document.querySelector("#resp").innerHTML = ''

    display(stack[0])

}

const reseta = () => {
    states.modo = 'esperandoNumero'
    states.funcao = 'permitir'
    states.temDecimal = false
    states.caractereDecimalPendente = true
    states.resultado = false
    states.errorDisplay = false

    document.querySelector("#resp").innerHTML = ''
}

const apagarCaractere = () => {

    if (states.errorDisplay == true) {
        reseta()
        return
    }

    const tela = document.querySelector("#resp")
    let mudarOperador = tela.innerHTML.split('')
    mudarOperador.pop()
    let idx = mudarOperador.length


    const operadores = ['+', '-', 'x', '/']
    const decimal = '.'
    const verificaOperador = operadores.filter((element) => element == mudarOperador[idx - 1])
    const verificaDecimal = mudarOperador[idx - 1] == decimal ? true : false



    if (verificaOperador.length > 0) {
        states.modo = 'operador'
        states.funcao = 'permitir'
        states.temDecimal = false
        states.caractereDecimalPendente = true
        states.resultado = false
    } else if (verificaDecimal) {
        states.modo = 'numero'
        states.temDecimal = true
        states.caractereDecimalPendente = false
        states.funcao = 'permitir'
        states.resultado = false

    } else {
        if (idx == 0) {
            states.modo = 'esperandoNumero'
            states.temDecimal = false
            states.caractereDecimalPendente = true
            states.funcao = 'permitir'
            states.resultado = false
            states.errorDisplay = false

        } else {
            states.modo = 'numero'
            states.funcao = 'permitir'
            states.resultado = false
            states.caractereDecimalPendente = true

            const idxOperador = mudarOperador.findLastIndex(element => operadores.includes(element))

            if (idxOperador != -1) {
                const newArr = mudarOperador.slice(idxOperador + 1)
                const arr_decimal = newArr.findIndex(element => element == decimal)

                if (arr_decimal != -1) {
                    states.temDecimal = true
                } else {
                    states.temDecimal = false
                }

            } else {
                const arr_decimal = mudarOperador.findIndex(element => element == decimal)

                if (arr_decimal != -1) {
                    states.temDecimal = true

                } else {
                    states.temDecimal = false
                }

            }

        }

    }

    tela.innerText = mudarOperador.join('')

}