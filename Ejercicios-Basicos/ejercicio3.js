// Escribe un programa de dos líneas que pida el nombre del usuario con un prompt y escriba un texto que diga “Hola nombreUsuario”.
const prompt = require('prompt-sync')({sigint: true});

let nombreUsuario = prompt('Ingresa tu nombre: ')
console.log('Hola ' + nombreUsuario);

