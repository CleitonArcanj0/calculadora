let valorAtual = '',
    valorAnterior = [],
    statesNum = true,
    statesOpera = false;

const capturarNum = (num) => {  //teclado
    const numero = num.innerHTML
    states(num)
}

const display = (num) => {
    const tela = document.querySelector("#resp")

    tela.innerText += num
}

const states = (num) => {
    const valor = num.innerHTML
    const numeros = '1234567890'
    const operadores = ['+', '-', 'x', '/']

    let verificaOperador = operadores.filter((element) => valor == element)
    
    //verifica sem tem algum operador no array, caso não tenha, o elemento é um número
    if (verificaOperador.length > 0) {
        //impede que inicie com operador. 
        if (valorAtual.length > 0) {
            statesNum = false
            statesOpera = true
            valorAnterior.push(valorAtual)
            valorAtual = ''
        } else {
            alert("Comece com número")
            return
        }

    } else {
        statesNum = true;
        statesOpera = false;
        valorAtual += valor

    }
    display(valor)
}
