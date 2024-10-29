const express = require('express')
const bodyParser = require('body-parser')

const meuAppApis = express()

meuAppApis.use(bodyParser.json())

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

meuAppApis.get('/somabody', (req,res) => {

    //a variável body vai receber o corpo da requisição
    const body = req.body 
    console.log(body)

    let total = body.numero1 + body.numero2
    res.send(`O total da Soma é ${total}`)
})

meuAppApis.get('/somafixa', (req,res) => {
    let total = 2 + 2
    res.send(`O total da Soma é ${total}`)
})

//Define a porta de escuta do servidor web
meuAppApis.listen(2024, () =>{
    console.log('Servidor aberto')
})