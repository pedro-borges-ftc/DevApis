const express = require('express')
const bodyParser = require('body-parser')

const meuAppApis = express()

meuAppApis.use(bodyParser.json())

//Primeiro Parâmetro é o endpoint, ou seja, o caminho da API (/soma)
//Segundo Parâmetro é a função que será chamada nesse endpoint (Usando função anônima)
//req são os dados da requisição
//res são os dados da resposta
meuAppApis.get('/somaquery', (req,res) => {

    //a variável headers vai receber os dados do cabeçalho da requisição
    const headers = req.headers
    console.log(headers)

    //a variável query vai receber os parâmetros passados via URL
    const query = req.query
    console.log(query)

    let total = Number(query.n1) + Number(query.n2)
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