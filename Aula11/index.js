const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');

//meuAppApis
const meuAppApis = express()
meuAppApis.use(bodyParser.json())

//tarefas
var tarefas = []
tarefas = lerListaTarefas()

//C - CREATE: POST /tarefa/v1
meuAppApis.post('/tarefa/v1', (req,res) => {

    //a variável body vai receber o corpo da requisição
    const body = req.body 
    console.log(body)

    tarefas.push(body.tarefa)

    salvarListaEmArquivo(tarefas);
    console.log(`Tarefa Inserida. ID: ${tarefas.length}`)

    res.send(`Tarefa Inserida. ID: ${tarefas.length}`)
})

//R - READ: GET /tarefa/v1
meuAppApis.get('/tarefa/v1', (req,res) => {
    tarefas = lerListaTarefas()

    // Mapeando o array para criar um JSON com chave 'codigo' e 'conteudo' para cada item
    const arrayDeObjetos = tarefas.map((item, index) => ({
        id: index + 1,     // Aqui usamos o índice como código (pode começar do 1, se preferir)
        tarefa: item
    }));
    
    // Convertendo o array em JSON
    const jsonString = JSON.stringify(arrayDeObjetos);

    res.send(jsonString)
})

//U - UPDATE: PUT /tarefa/v1
meuAppApis.put('/tarefa/v1', (req,res) => {

    //a variável body vai receber o corpo da requisição
    const body = req.body 
    console.log(body)

    let indice = Number(body.id) - 1
    tarefas[indice] = body.tarefa

    salvarListaEmArquivo(tarefas);
    console.log(`Tarefa alterada com sucesso. ID: ${body.id} | Tarefa: ${tarefas[indice]}`)

    res.send(`Tarefa alterada com sucesso. ID: ${body.id} | Tarefa: ${tarefas[indice]}`)
})

//U - UPDATE: PUT /tarefa/v2
meuAppApis.put('/tarefa/v2', (req,res) => {
    //a variável headers vai receber os dados do cabeçalho da requisição
    const headers = req.headers
    console.log(headers)

    //a variável query vai receber os parâmetros passados via URL
    const query = req.query
    console.log(query)

    //a variável body vai receber o corpo da requisição
    const body = req.body 
    console.log(body)

    let indice = Number(query.id) - 1
    tarefas[indice] = body.tarefa

    salvarListaEmArquivo(tarefas);
    console.log(`Tarefa alterada com sucesso. ID: ${query.id} | Tarefa: ${tarefas[indice]}`)

    res.send(`Tarefa alterada com sucesso. ID: ${query.id} | Tarefa: ${tarefas[indice]}`)
})

//D - DELETE: DELETE /tarefa/v1
meuAppApis.delete('/tarefa/v1', (req,res) => {

    //a variável body vai receber o corpo da requisição
    const body = req.body 
    console.log(body)

    //tarefas.splice(body.id, 1);//removendo o elemento pelo índice
    let indice = Number(body.id) - 1
    let tarefaRemovida = tarefas[indice]
    tarefas[indice] = ""

    salvarListaEmArquivo(tarefas);
    console.log(`Tarefa removida com sucesso. ID: ${body.id} | Tarefa: ${tarefaRemovida}`)

    res.send(`Tarefa removida com sucesso. ID: ${body.id} | Tarefa: ${tarefaRemovida}`)
})

//D - DELETE: DELETE /tarefa/v2
meuAppApis.delete('/tarefa/v2', (req,res) => {
    //a variável headers vai receber os dados do cabeçalho da requisição
    const headers = req.headers
    console.log(headers)

    //a variável query vai receber os parâmetros passados via URL
    const query = req.query
    console.log(query)

    //tarefas.splice(query.id, 1);//removendo o elemento pelo índice
    let indice = Number(query.id) - 1
    let tarefaRemovida = tarefas[indice]
    tarefas[indice] = ""

    salvarListaEmArquivo(tarefas);
    console.log(`Tarefa removida com sucesso. ID: ${query.id} | Tarefa: ${tarefaRemovida}`)

    res.send(`Tarefa removida com sucesso. ID: ${query.id} | Tarefa: ${tarefaRemovida}`)
})

function salvarListaEmArquivo(arrayDeStrings) {
    // Converte o array em uma string, onde cada elemento será uma linha separada por "\n"
    const conteudo = arrayDeStrings.join("\n");
    
    // Salva o conteúdo no arquivo listatarefas.txt
    fs.writeFileSync('listatarefas.txt', conteudo, 'utf8');

    console.log('Arquivo listatarefas.txt salvo com sucesso!');
}

function lerListaTarefas() {
    try {
        // Lê o conteúdo do arquivo listatarefas.txt de forma síncrona
        const conteudo = fs.readFileSync('listatarefas.txt', 'utf8');
        
        // Divide o conteúdo em um array, separando pelas quebras de linha
        const arrayDeTarefas = conteudo.split('\n');

        // Retorna o array de tarefas
        return arrayDeTarefas;
    } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
        return [];
    }
}

//Define a porta de escuta do servidor web
meuAppApis.listen(2026, () =>{
    console.log('Servidor aberto na porta 2026')
})