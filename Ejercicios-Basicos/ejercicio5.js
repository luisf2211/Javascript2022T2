// Escribe un programa que pida dos números y escriba en la pantalla cual es el mayor.
const prompt = require('prompt-sync')({sigint: true});

let num1 = parseInt(prompt('Ingrese el primer valor: ')); 
let num2 = parseInt(prompt('Ingrese el segundo valor: ')); 

if (num1 > num2) {

    console.log('El mayor es: ' + num1); 
    
} else { 
    console.log('El mayor es: ' + num2); 
}