// Importa o módulo readline do Node.js
const readline = require('readline');

// Cria a interface para entrada e saída no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para solicitar uma nota
function perguntarNota(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta) => {
      resolve(parseFloat(resposta)); // Converte a resposta em número
    });
  });
}

async function calcularMedia() {
  try {
    const nota1 = await perguntarNota("Digite a primeira nota: ");
    const nota2 = await perguntarNota("Digite a segunda nota: ");

    const media = (nota1 + nota2) / 2;

    console.log(`A média das notas é: ${media.toFixed(2)}`);
  } catch (error) {
    console.error("Erro ao calcular a média:", error);
  } finally {
    rl.close(); // Fecha a interface readline
  }
}

// Executa a função principal
calcularMedia();