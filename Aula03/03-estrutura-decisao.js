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

async function calcularIMC() {
  try {
    const peso = await perguntarNota("Digite o seu peso (kg): ");
    const altura = await perguntarNota("Digite a sua altura (m): ");

    const imc = peso / (altura * altura);

    console.log(`O seu IMC é: ${imc.toFixed(2)}`);

    if (imc < 18.5) {
    console.log("Abaixo do peso")
    } else if (imc >= 18.5 && imc < 25) {
        console.log("Peso normal")
    } else if (imc >= 25 && imc < 30) {
        console.log("Sobrepeso")
    } else {
        console.log("Obesidade")
    }
  } catch (error) {
    console.error("Erro ao calcular o IMC:", error);
  } finally {
    rl.close(); // Fecha a interface readline
  }
}

// Executa a função principal
calcularIMC();