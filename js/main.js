
let states = {
    modo: 'esperandoNumero',  /*Vai assumir valores: numero, operador ou esperando*/
    temDecimal: false,
    caractereDecimal: false,  /*Verifica se o último caractere foi um decimal */
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

        } else if (states.modo == 'numero' && states.caractereDecimal == false) {
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
            states.caractereDecimal = true
            states.funcao = 'permitir'

        } else {
            states.temDecimal = false
            states.funcao = 'ignorar'

        }

    } else {
        states.modo = 'numero'
        states.funcao = 'permitir'

        /*substitui o if */
        states.caractereDecimal == true && (states.caractereDecimal = false)


    }


    return resultado = {
        valor: entrada,
        modo: states.modo,
        decimal: states.temDecimal,
        decimalPendende: states.caractereDecimal,
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