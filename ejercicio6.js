// Escribe un programa que pida 3 números y escriba en la pantalla el mayor de los tres.

let num1 = parseInt(prompt('Ingrese el primer valor: ')); 
let num2 = parseInt(prompt('Ingrese el segundo valor: ')); 
let num3 = parseInt(prompt('Ingrese el tercer valor: ')); 

if (num1 >= num2 && num1 >= num3) {

    alert('El mayor es: ' + num1); 
    
} else if (num2 >= num1 && num2 >= num3) {

    alert("El mayor es: " + num2); 
    
} else { 

    alert('El mayor es: ' + num3)
}