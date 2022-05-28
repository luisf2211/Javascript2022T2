let url = "https://jsonplaceholder.typicode.com/todos/"; 
let totalUsuarios; 

//Llamar a la API para obtener los clientes.

fetch(url).then(res => res.json()).then(data => {cantidadUsuarios(data)
})

// Crear una funcion donde recupere los datos de la API de clientes, una vez obtenidos pasar los datos de la cantidad de clientes dentro del arreglo para hacer el calculo de los clientes en el dashboard.

function cantidadUsuarios(datos) { 

  console.log(datos.length)
  
  const ctx = document.getElementById('myChart');
  
  const myChart = new Chart(ctx, {

    type: 'bar',
    data: {
        labels: ['Customers created', 'Customers Deleted'],
        datasets: [{
            label: ['# of users created'],

            // Recuperar datos de API para mostrar total de clientes en el dashboard.
            data: [datos.length, 150],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            barPercentage: 0.5,
            barThickness: 80,
            maxBarThickness: 80,
            minBarLength: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


}




