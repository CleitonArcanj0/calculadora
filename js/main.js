
let states = {
    modo: 'esperandoNumero',  /*Vai assumir valores: numero, operador ou esperando*/
    temDecimal: false,
    caractereDecimalPendente: true,  /*Verifica se o último caractere foi um decimal */
    funcao: 'permitir'

};

const capturarNum = (num) => {  //teclado
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

        } else if (states.modo == 'numero' && states.caractereDecimalPendente == true) {
            states.modo = 'operador'
            states.funcao = 'permitir'
            states.temDecimal = false

        } else {
            states.funcao = 'ignorar'
        }
    } else if (verificaDecimal) {
        if (states.temDecimal == true) {
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


    }


    return resultado = {
        valor: entrada,
        modo: states.modo,
        decimal: states.temDecimal,
        decimalPendende: states.caractereDecimalPendente,
        funcao: states.funcao
    };

}

const executa = (valor) => {
    const entrada = processaEntrada(valor)

    if (entrada.decimal == true && entrada.funcao == 'ignorar' || entrada.decimal == false && entrada.funcao == 'ignorar') {
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
        display(entrada.valor)

    }
}

const formatarExpressao = () => {
    const tela = document.querySelector("#resp").innerText
    const expressao = tela.match(/\d+[.]\d+|\d+|[+x*/-]/g)
    const elementosExpressao = []


    if (states.modo == 'operador' || states.caractereDecimalPendente == false) {
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
            }

        }
    })
    document.querySelector("#resp").innerHTML = ''
    display(stack[0])

}