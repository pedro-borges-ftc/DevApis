var vetor = [5, 3, 8.4, 12, 8, 9, 78, 45, 13, 18, 39, 22.22]
var soma = 0

for(var index in vetor){
    console.log(index, vetor[index])
    soma += vetor[index]
}

var media = soma / vetor.length

console.log(`A soma do array [${vetor}]: ${soma}`)
console.log(`A média do array [${vetor}]: ${media}`)