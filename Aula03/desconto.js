// II - Definição de variáveis
const NOME_PRODUTO = "Nivus" 
let precoOriginal = 119990.00
let valorDoDesconto = 0

// III - Criação da função
function calcularPrecoFinal(preco){
    // verificar qual percentual de desconto será aplicado
    if(preco >= 200000){
        valorDoDesconto = preco * 0.15  // 15% de desconto
    }else{
        valorDoDesconto = preco * 0.05  // 5% de desconto
    }

    // Calcular preço final
    let precoFinal = preco - valorDoDesconto

    // Retornar o preço final e o valor do desconto
    return precoFinal
}

// IV - Chamada da Função
let resultado = calcularPrecoFinal(precoOriginal)

// V - Exibição dos resultados
console.log("#############################################")
console.log("Calculadora de Desconto Simples em JavaScript")
console.log("#############################################")
console.log(`Produto: ${NOME_PRODUTO}`)
console.log(`Preço Original: R$ ${precoOriginal.toFixed(2)}`)
console.log(`Valor do Desconto: R$ ${valorDoDesconto.toFixed(2)}`)
console.log(`Preço Final: R$ ${resultado.toFixed(2)}`)