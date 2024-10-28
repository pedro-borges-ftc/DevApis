const express = require('express')

const meuAppApis = express()

//Primeiro Parâmetro é o endpoint, ou seja, o caminho da API (/soma)
//Segundo Parâmetro é a função que será chamada nesse endpoint (Usando função anônima)
//req são os dados da requisição
//res são os dados da resposta
meuAppApis.get('/somafixa', (req,res) => {
    let total = 2 + 2
    res.send(`O total da Soma é ${total}`)
})

//Define a porta de escuta do servidor web
meuAppApis.listen(2024, () =>{
    console.log('Servidor aberto')
})

/*
//Função anônima:
    () =>{
        console.log('Servidor aberto')
    })
*/