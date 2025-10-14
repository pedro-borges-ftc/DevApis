var cep = '45604010'

var url = `https://viacep.com.br/ws/${cep}/json/`

console.log(url)

fetch(url)
    .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error("CEP não encontrado!")
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
        
    })
    .catch(error => {
        console.log('Erro:', error)
    })

function mostrarEndereco(dados) {
    if (dados.erro) {
        console.log("CEP não encontrado!")
    } else {
        //Logradouro
        console.log(`Logradouro ${dados.logradouro}`)
        //Bairro
        console.log(`Bairro ${dados.bairro}`)
        //Cidade/UF
        console.log(`Cidade/UF ${dados.localidade} / ${dados.uf}`)
        //CEP
        console.log(`CEP ${dados.cep}`)
        //DDD
        console.log(`DDD ${dados.ddd}`)
        //REGIÃO
        console.log(`REGIÃO ${dados.regiao}`)
    }
}