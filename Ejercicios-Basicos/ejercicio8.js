// Escribir un programa que nos diga si un número dado es primo (no es divisible por ninguno otro número que no sea él mismo o la unidad).

 
let numerosPrimos = [];
let numerosNoPrimos = [];
let numero = parseInt(prompt('Ingresa un valor: '))

for (let i = 1; i <= numero; i++) {


    if (numero%i == 0) {

        // console.log('Es primo.')

        numerosPrimos.push(i)
        
    } else { 

        numerosNoPrimos.push(i)
    }
    
}

// console.log(numerosPrimos);
// console.log(numerosNoPrimos);
yt
if (numerosPrimos.length <= 2) {

    alert('Es primo. ');
    
} else if (numerosPrimos.length >= 2 && numerosNoPrimos.length >=1 ) {

    alert('No es primo. ');
    
}



