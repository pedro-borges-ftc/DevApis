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
    //Inserção no início do Array através do unshift
    notas.unshift(Number(result.nota01))
    notas.unshift(Number(result.nota02))
    notas.unshift(Number(result.nota03))
    notas.unshift(Number(result.nota04))
    notas.unshift(Number(result.nota05))
    notas.unshift(Number(result.nota06))
    notas.unshift(Number(result.nota07))
    notas.unshift(Number(result.nota08))
    notas.unshift(Number(result.nota09))
    notas.unshift(Number(result.nota10))

    //Saída dos resultados
    console.log(`Array Notas ${notas}`)
})