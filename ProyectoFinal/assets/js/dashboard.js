let urlCustomers = "http://localhost:3000/customers"; 
let urlUsers = "http://localhost:3000/users"; 

(async () => {
    const clientes = await fetch(urlCustomers).then(response => response.json());
    const usuarios = await fetch(urlUsers).then(response => response.json());
 
    const labels = ['CRM Database data'];
 
   const data = {
     labels: labels,
     datasets: [
     {
       label: 'Total of Customers',
       backgroundColor: ['#DCD6F7'],
       borderColor: ['#DCD6F7'],
       data: [clientes.length],
       barPercentage: 0.5,
         barThickness: 80,
         maxBarThickness: 90,
         minBarLength: 2,
     },
     {
         label: 'Total of Users',
         backgroundColor: ['#424874'],
         borderColor: ['#424874'],
         data: [usuarios.length],
           barPercentage: 0.5,
           barThickness: 80,
           maxBarThickness: 90,
           minBarLength: 2,
       }
 ]
   };
 
 
   const config = {
     type: 'bar',
     data: data,
     options: {}
   };
 
   const myChart = new Chart(
     document.getElementById('myChart'),
     config
   );
 })();

