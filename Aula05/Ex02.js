/*
Autor: Peuborg

Exercício - Ler Notas

Faça um programa que crie um array de 10 posições,
leia a nota e o índice de 3 alunos e armazene os valores
das notas nos respectivos índices do array.

Por fim, imprima o array.

*/
console.log('Ler 3 Notas')

var prompt = require('prompt');

prompt.start();

prompt.get(['nota01', 'indice01','nota02', 'indice02','nota03', 'indice03'], function (err, result) {
    
    var notas = [,,,,,,,,,]

    //Leitura dos dados
    //Inserção no array através do índicenotas[indice01] = Number(result.nota01)
    notas[Number(result.indice01)] = Number(result.nota01)
    notas[Number(result.indice02)] = Number(result.nota02)
    notas[Number(result.indice03)] = Number(result.nota03)
    
    //Saída dos resultados
    console.log(`Array Notas ${notas}`)
})