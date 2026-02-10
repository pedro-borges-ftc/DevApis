var peso = 175       //em kgs
var altura = 1.65   //em metros

var imc = peso / (altura * altura)

switch (true) {
    case (imc < 18.5):
        console.log("Abaixo do peso")
        break
    case (imc >= 18.5 && imc < 25):
        console.log("Peso normal")
        break
    case (imc >= 25 && imc < 30):
        console.log("Sobrepeso")
        break
    default:
        console.log("Obesidade")
}