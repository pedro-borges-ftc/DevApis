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
    //Inserção no fim do Array através do push
    notas.push(Number(result.nota01))
    notas.push(Number(result.nota02))
    notas.push(Number(result.nota03))
    notas.push(Number(result.nota04))
    notas.push(Number(result.nota05))
    notas.push(Number(result.nota06))
    notas.push(Number(result.nota07))
    notas.push(Number(result.nota08))
    notas.push(Number(result.nota09))
    notas.push(Number(result.nota10))

    //Saída dos resultados
    console.log(`Array Notas ${notas}`)
})