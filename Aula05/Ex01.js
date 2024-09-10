/*
Autor: Peuborg

Exercício - Ler Notas

Faça um programa que leia a nota de 10 alunos e
armazene os valores em um array.

Por fim, imprima o array.

*/
console.log('Ler Notas da Média')

var prompt = require('prompt');

prompt.start();

prompt.get(['nota01', 'nota02','nota03', 'nota04','nota05', 'nota06','nota07', 'nota08','nota09', 'nota10'], function (err, result) {
    
    var notas = []

    //Leitura dos dados
    //Inserção no array através do índice
    notas[0] = Number(result.nota01)
    notas[1] = Number(result.nota02)
    notas[2] = Number(result.nota03)
    notas[3] = Number(result.nota04)
    notas[4] = Number(result.nota05)
    notas[5] = Number(result.nota06)
    notas[6] = Number(result.nota07)
    notas[7] = Number(result.nota08)
    notas[8] = Number(result.nota09)
    notas[9] = Number(result.nota10) 

    //Saída dos resultados
    console.log(`Array Notas ${notas}`)
})