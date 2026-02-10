// Importa o módulo readline do Node.js
const readline = require('readline');

// Cria a interface para entrada e saída no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para solicitar uma nota
function perguntarInformacao(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta) => {
      resolve(resposta); // Converte a resposta em número
    });
  });
}

//objeto Pessoa
function pessoas(nome, idade) {
  this.nome = nome;
  this.idade = parseInt(idade);
  this.saudacao = function() {    
    console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
  }
}   

// Criando um array para armazenar as pessoas
var arrayPessoas = [];

//Crie um programa JS que solicita a digitação do nome e idade de várias pessoas
async function digitacaoPessoas() {
  try {

    do {
        const nome = await perguntarInformacao("Digite o nome: ");
        const idade = await perguntarInformacao("Digite a idade: ");

        const pessoa = new pessoas(nome, idade);
        arrayPessoas.push(pessoa);   // Adiciona a pessoa ao array

        const continuar = await perguntarInformacao("Deseja cadastrar outra pessoa? (1 para sim, 0 para não): ");
        
        if (continuar === '0') {
            break; // Sai do loop se o usuário não quiser continuar
        }
    }while (true);

    // Exibe as saudações de todas as pessoas cadastradas
    for (const pessoa of arrayPessoas) {
        pessoa.saudacao(); // Chama o método de saudação para cada pessoa cadastrada
    }
    
  } catch (error) {
    console.error("Erro ao cadastrar pessoa:", error);
  } finally {
    rl.close(); // Fecha a interface readline
  }
}

// Executa a função principal
digitacaoPessoas();


