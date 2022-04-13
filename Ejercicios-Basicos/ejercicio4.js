// Escribe un programa de tres líneas que pida un número, pida otro número y escriba el resultado de sumar estos dos números.
const prompt = require('prompt-sync')({sigint: true});

let num1 = parseInt(prompt('Ingrese el primer valor: ')); let num2 = parseInt(prompt('Ingrese el segundo valor: '));
let resultado = num1 + num2; 
console.log("El resultado es: " + resultado);