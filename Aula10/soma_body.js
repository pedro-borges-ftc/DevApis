const express = require('express')
const bodyParser = require('body-parser')

const meuAppApis = express()

meuAppApis.use(bodyParser.json())

//Primeiro Parâmetro é o endpoint, ou seja, o caminho da API (/soma)
//Segundo Parâmetro é a função que será chamada nesse endpoint (Usando função anônima)
//req são os dados da requisição
//res são os dados da resposta
meuAppApis.get('/somabody', (req,res) => {

    //a variável body vai receber o corpo da requisição
    const body = req.body 
    console.log(body)

    let total = body.numero1 + body.numero2
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