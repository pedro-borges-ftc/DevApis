const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
const ini = require('ini');
const { MongoClient, ObjectId } = require('mongodb'); // Importa o MongoClient do driver MongoDB

//Variáveis para conexão no MongoDb
var url = ''                // URL de conexão (ajuste conforme necessário, ex: com credenciais ou outro endereço)
var dbName = '';            // Nome da instância do banco de dados
var collectionName = '';    // Nome da coleção
lerDadosConexao()           // Leitura dos parâmetros para conexão no banco de dados

//Client de conexão no MongoDB
const client = new MongoClient(url);

//
var arrayDeObjetos = []

//meuAppApis
const meuAppApis = express()
meuAppApis.use(bodyParser.json())

//C - CREATE: POST /tarefa/inserir/v2
meuAppApis.post('/tarefa/inserir/v2', async (req,res) => {
    //a variável body vai receber o corpo da requisição
    const body = req.body 
    console.log(body)
    //
    try {
        await client.connect()
        console.log("Conectado ao servidor MongoDB!")
        // Seleciona o banco de dados
        const db = client.db(dbName)
        // Seleciona a coleção de tarefas
        const collection = db.collection(collectionName)
        // Registro da tarefa a ser inserida
        var novaTarefa = {
            Descricao: body.tarefa,
            DataInicial: new Date(),        // Data e hora atual
            DataFinal: null,                // Data final específica
            Status: "Fazer"                 // Status pode ser 'Fazer', 'Fazendo', 'Validar', 'Corrigir', 'Feito'
        };
        // Inserir o documento na coleção
        const resultado = await collection.insertOne(novaTarefa)
        // Exibe o resultado da inserção
        console.log('Tarefa inserida com sucesso')
        console.log(novaTarefa)
        const jsonTarefas = JSON.stringify(novaTarefa, null, 2); // O parâmetro 'null' e '2' formata o JSON com indentação
        res.send(jsonTarefas)
    } catch (err) {
        console.error('Erro ao inserir tarefa', err)
        return 'Erro ao inserir tarefa'
    } finally {
        // Fecha a conexão com o MongoDB
        await client.close()
        console.log("Conexão ao servidor MongoDB Encerrada!")
    }
})

//R - READ: GET /tarefa/lista/v2
meuAppApis.get('/tarefa/lista/v2', async (req,res) => {
    try {
        // Conecta ao servidor MongoDB
        await client.connect()
        console.log("Conectado ao servidor MongoDB!")
        // Seleciona o banco de dados
        const db = client.db(dbName)
        // Seleciona a coleção de tarefas
        const collection = db.collection(collectionName)
        // Consulta todos os documentos da coleção
        const tarefas = await collection.find({}).toArray()
        
        for (let i = 0; i < tarefas.length; i++) {
            arrayDeObjetos[i] = tarefas[i]
            const tarefa = tarefas[i]
        }
        console.log("Tarefas encontradas:")
        console.log(arrayDeObjetos)
         // Convertendo o array em JSON
        const jsonTarefas = JSON.stringify(arrayDeObjetos, null, 2); // O parâmetro 'null' e '2' formata o JSON com indentação
        res.send(jsonTarefas)
    } catch (err) {
        console.error("Erro ao consultar as tarefas:", err)
        res.send("Erro ao consultar as tarefas: /n" + err)
    } finally {
        // Fecha a conexão com o MongoDB
        await client.close()
        console.log("Conexão ao servidor MongoDB Encerrada!")
    }
})

//U - UPDATE: POST /tarefa/alterar/v2
meuAppApis.post('/tarefa/alterar/v2', async (req,res) => {
    //a variável body vai receber o corpo da requisição
    const body = req.body 
    console.log(body)
    //
    try {
        await client.connect()
        console.log("Conectado ao servidor MongoDB!")
        // Seleciona o banco de dados
        const db = client.db(dbName)
        // Seleciona a coleção de tarefas
        const collection = db.collection(collectionName)
        // Registro da tarefa a ser alterada
        var tarefa = {
            Descricao: body.Descricao,
            DataInicial: body.DataInicial,
            DataFinal: body.DataFinal,
            Status: body.Status
        };
    ;
        // Define o filtro para encontrar o documento (_id)
        const filtro = { _id: new ObjectId(body._id) };
        console.log(filtro)
        // Define os novos valores para os campos
        const novosValores = {'$set': tarefa};
        console.log(novosValores)
        // Atualiza o documento
        const resultado = await collection.updateOne(filtro, novosValores);
        console.log(`Quantidade de registros alterados ${resultado.matchedCount}`)
        if (resultado.matchedCount === 0) {
            console.log("Nenhum documento encontrado com o ID fornecido.");
        } else {
            console.log("Documento atualizado com sucesso.");
        }
        //console.log(resultado)
        const jsonTarefas = JSON.stringify(tarefa, null, 2); // O parâmetro 'null' e '2' formata o JSON com indentação
        res.send(jsonTarefas)
    } catch (err) {
        console.error("Erro ao atualizar a tarefa:", err);
        return 'Erro ao atualizar a tarefa'
    } finally {
        // Fecha a conexão com o MongoDB
        await client.close()
        console.log("Conexão ao servidor MongoDB Encerrada!")
    }
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