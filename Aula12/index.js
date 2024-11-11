const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
const ini = require('ini');
const { MongoClient } = require('mongodb'); // Importa o MongoClient do driver MongoDB

//Variáveis para conexão no MongoDb
var url = ''                // URL de conexão (ajuste conforme necessário, ex: com credenciais ou outro endereço)
var dbName = '';            // Nome da instância do banco de dados
var collectionName = '';    // Nome da coleção
lerDadosConexao()           // Leitura dos parâmetros para conexão no banco de dados

//Client de conexão no MongoDB
const client = new MongoClient(url);

//meuAppApis
const meuAppApis = express()
meuAppApis.use(bodyParser.json())

//C - CREATE: POST /tarefa/inserir/v2
meuAppApis.post('/tarefa/inserir/v2', (req,res) => {
    //a variável body vai receber o corpo da requisição
    const body = req.body 
    console.log(body)
    res.send(inserirTarefa(body.tarefa))
})

function inserirTarefa(TarefaDescricao) {
    try {
        // Conecta ao servidor MongoDB
        client.connect();
        console.log("Conectado ao servidor MongoDB!");

        // Seleciona o banco de dados
        const db = client.db(dbName);

        // Seleciona a coleção de tarefas
        const collection = db.collection(collectionName);

        // Registro da tarefa a ser inserida
        var novaTarefa = {
            Descricao: TarefaDescricao,
            DataInicial: new Date(),        // Data e hora atual
            DataFinal: null,                // Data final específica
            Status: "Fazer"                 // Status pode ser 'Fazer', 'Fazendo', 'Validar', 'Corrigir', 'Feito'
        };

        // Inserir o documento na coleção
        const resultado = collection.insertOne(novaTarefa);

        // Exibe o resultado da inserção
        console.log('Tarefa inserida com sucesso');
        console.log(novaTarefa)
        return novaTarefa

    } catch (err) {
        console.error('Erro ao inserir tarefa', err);
        return 'Erro ao inserir tarefa'
    } finally {
        // Fecha a conexão com o MongoDB
        client.close();
    }
}

//R - READ: GET /tarefa/lista/v2
meuAppApis.get('/tarefa/lista/v2', (req,res) => {

    // Mapeando o array para criar um JSON com chave 'codigo' e 'conteudo' para cada item
    const arrayDeObjetos = tarefas.map((item, index) => ({
        id: index + 1,     // Aqui usamos o índice como código (pode começar do 1, se preferir)
        tarefa: item
    }));
    
    // Convertendo o array em JSON
    const jsonString = JSON.stringify(arrayDeObjetos);

    res.send(jsonString)
})

//U - UPDATE: POST /tarefa/alterar/v2
meuAppApis.post('/tarefa/alterar/v2', (req,res) => {

    //a variável body vai receber o corpo da requisição
    const body = req.body 
    console.log(body)

    let indice = Number(body.id) - 1
    tarefas[indice] = body.tarefa

    console.log(`Tarefa alterada com sucesso. ID: ${body.id} | Tarefa: ${tarefas[body.id]}`)

    res.send(`Tarefa alterada com sucesso. ID: ${body.id} | Tarefa: ${tarefas[body.id]}`)
})

//D - DELETE: POST /tarefa/remover/v2
meuAppApis.post('/tarefa/remover/v2', (req,res) => {

    //a variável body vai receber o corpo da requisição
    const body = req.body 
    console.log(body)

    //tarefas.splice(body.id, 1);//removendo o elemento pelo índice
    let indice = Number(body.id) - 1
    let tarefaRemovida = tarefas[indice]
    tarefas[indice] = ""

    console.log(`Tarefa removida com sucesso. ID: ${body.id} | Tarefa: ${tarefaRemovida}`)

    res.send(`Tarefa removida com sucesso. ID: ${body.id} | Tarefa: ${tarefaRemovida}`)
})

function lerDadosConexao() {
    try {
        // Lê o conteúdo do arquivo dbinit.ini de forma síncrona
        const conteudoIni = fs.readFileSync('dbinit.ini', 'utf-8');
        
        // Faz o parsing do conteúdo para um objeto JavaScript
        const config = ini.parse(conteudoIni);
        
        // Extrai os dados da seção CONFIG
        url = config.CONFIG.url.replace(/'/g, ""); // Removendo as aspas simples
        dbName = config.CONFIG.dbName.replace(/'/g, ""); // Removendo as aspas simples
        collectionName = config.CONFIG.collectionName.replace(/'/g, ""); // Removendo as aspas simples

        // Exibe os valores para verificação
        console.log(`URL de Conexão: ${url}`);
        console.log(`Nome do Banco de Dados: ${dbName}`);
        console.log(`Nome da Coleção: ${collectionName}`);

        // Retorna os valores em um objeto
        return { url, dbName, collectionName };
    } catch (err) {
        console.error('Erro ao ler os dados de conexão:', err);
    }
}

//Define a porta de escuta do servidor web
meuAppApis.listen(2024, () =>{
    console.log('Servidor aberto')
})