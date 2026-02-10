var peso = 149       //em kgs
var altura = 1.70   //em metros

var imc = peso / (altura * altura)

if (imc < 18.5) {
    console.log("Abaixo do peso")
} else if (imc >= 18.5 && imc < 25) {
    console.log("Peso normal")
} else if (imc >= 25 && imc < 30) {
    console.log("Sobrepeso")
} else {
    console.log("Obesidade")
}