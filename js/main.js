let valorAtual = '',
    valorAnterior = [],
    statesNum = true,
    statesOpera = false,
    stateDecimal = false;

const capturarNum = (num) => {  //teclado
    const numero = num.innerHTML
    states(num)
}

const display = (num) => {
    const tela = document.querySelector("#resp")

    if (tela.innerHTML == 0) {
        tela.innerText = num
    } else {
        tela.innerText += num
    }
}

const states = (num) => {
    const valor = num.innerHTML
    const numeros = '1234567890'
    const operadores = ['+', '-', 'x', '/']
    const decimal = '.'

    let verificaOperador = operadores.filter((element) => valor == element)
    let verificaDecimal = valor == decimal ? true : false;

    if (stateDecimal == true && verificaDecimal) {
        return
    }


    //verifica sem tem algum operador no array, caso não tenha, o elemento é um número
    if (verificaOperador.length > 0) {
        //impede que inicie com operador. 
        if (valorAtual.length > 0 && statesNum == true) {
            statesNum = false
            statesOpera = true
            stateDecimal = false;
            valorAnterior.push(valorAtual)
            valorAtual = ''
        } else {
            alert("Algo está incorreto!")
            return
        }

    } else {
        if (verificaDecimal) {
            if (statesOpera == false && statesNum == true) {
                valorAtual += valor;
                stateDecimal = true;
                statesNum = false;
                statesOpera = false;

            } else {
                return
            }
        } else {
            statesNum = true;
            statesOpera = false;
            valorAtual += valor

        }


    }

    display(valor)
}