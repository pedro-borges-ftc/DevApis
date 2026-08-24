/*
Autor: Peuborg

Exercicio - CRUD com Array

Programa de console para simular as operacoes de CRUD utilizando
um array como estrutura de dados para gravar os registros.
*/

console.log('CRUD com Array')

var alunos = []
var proximoId = 1

function criar(nome, curso) {
    var aluno = {
        id: proximoId,
        nome: nome,
        curso: curso
    }
    alunos.push(aluno)
    proximoId++
    console.log('Registro criado:')
    console.log(aluno)
}

function listar() {
    console.log('Lista de registros:')

    if (alunos.length == 0) {
        console.log('Nenhum registro encontrado.')
    } else {
        console.log(alunos)
    }
}

function buscar(id) {
    var alunoEncontrado = alunos.find(function (aluno) {
        return aluno.id == id
    })

    console.log(`Busca pelo id ${id}:`)

    if (alunoEncontrado == undefined) {
        console.log('Registro nao encontrado.')
    } else {
        console.log(alunoEncontrado)
    }
}

function atualizar(id, novoNome, novoCurso) {
    var alunoEncontrado = alunos.find(function (aluno) {
        return aluno.id == id
    })

    console.log(`Atualizacao do id ${id}:`)

    if (alunoEncontrado == undefined) {
        console.log('Registro nao encontrado.')
    } else {
        alunoEncontrado.nome = novoNome
        alunoEncontrado.curso = novoCurso
        console.log('Registro atualizado:')
        console.log(alunoEncontrado)
    }
}

function remover(id) {
    var indice = alunos.findIndex(function (aluno) {
        return aluno.id == id
    })

    console.log(`Remocao do id ${id}:`)

    if (indice == -1) {
        console.log('Registro nao encontrado.')
    } else {
        var alunoRemovido = alunos.splice(indice, 1)
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