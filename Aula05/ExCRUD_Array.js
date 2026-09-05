/*
Autor: Peuborg

Exercicio - CRUD com Array

Programa de console para simular as operacoes de CRUD utilizando
um array como estrutura de dados para gravar os registros.
*/

console.log('CRUD com Array')

var alunos = []
var proximoId = 1

// Método de inserir um novo aluno no Array "alunos"
function criar(nome, curso) {
    var aluno = {
        id: proximoId,
        nome: nome,
        curso: curso
    }
    alunos.push(aluno)  //Push: Insere um aluno novo no final do Array
    proximoId++
    console.log('Registro criado:')
    console.log(aluno)
}

//Método para exibir a listagem de alunos
function listar() {
    console.log('Lista de registros:')

    if (alunos.length == 0) {
        console.log('Nenhum registro encontrado.')
    } else {
        console.log(alunos)     //Imprime no console a string com todos os registros no array "alunos"
    }
}

//Método para buscar e exibir um aluno específico do Array "alunos"
function buscar(id) {
    var alunoEncontrado = alunos.find(function (aluno) {    //Find é usado para localizar pelo id
        return aluno.id == id
    })

    console.log(`Busca pelo id ${id}:`)

    if (alunoEncontrado == undefined) {
        console.log('Registro não encontrado.')
    } else {
        console.log(alunoEncontrado)
    }
}

//Método para alterar um aluno específico no Array "alunos"
function atualizar(id, novoNome, novoCurso) {
    var alunoEncontrado = alunos.find(function (aluno) {
        return aluno.id == id
    })

    console.log(`Atualizacao do id ${id}:`)

    if (alunoEncontrado == undefined) {
        console.log('Registro não encontrado.')
    } else {
        alunoEncontrado.nome = novoNome
        alunoEncontrado.curso = novoCurso
        console.log('Registro atualizado:')
        console.log(alunoEncontrado)
    }
}

//Método para remover um elemento específico no Array "alunos"
function remover(id) {
    var indice = alunos.findIndex(function (aluno) {    //findIndex: Devolve a posição do array do elemente pesquisado
        return aluno.id == id
    })

    console.log(`Remocao do id ${id}:`)

    if (indice == -1) {
        console.log('Registro não encontrado.')
    } else {
        var alunoRemovido = alunos.splice(indice, 1)    //splice: remove elementos de um array a partir de uma posição splice(posição,quantidade)
        console.log('Registro removido:')
        console.log(alunoRemovido[0])
    }
}

// Chamadas das funcoes do CRUD
criar('Ana', 'JavaScript')
criar('Bruno', 'HTML e CSS')
criar('Carla', 'Node.js')

listar()
buscar(2)
atualizar(2, 'Bruno Silva', 'React')
buscar(2)
remover(1)
listar()