// Escribe un programa que pida un número y diga si es divisible por 2.
const prompt = require('prompt-sync')({sigint: true});

let num = parseInt(prompt('Ingrese un valor: '))

if (num%2 === 0) {

    console.log('Es divisible por 2. ')
    
} else { 

    console.log('No es divisible por 2. ')

}

