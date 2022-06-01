
(async () => {
   
   const user = await callAPI(`${url}/user`, "GET", {}).then( response => response)
   const customer = await callAPI(`${url}/customer`, "GET", {}).then( response => response)
   const interaction = await callAPI(`${url}/interaction`, "GET", {}).then( response => response)

 
    const labels = ['Proyecto CRM'];
 
   const data = {
     labels: labels,
     datasets: [
      {
        label: 'Total de Usuarios',
        backgroundColor: ['#D6D1B1'],
        borderColor: ['#424874'],
        data: [user.length],
          barPercentage: 0.5,
          barThickness: 80,
          maxBarThickness: 90,
          minBarLength: 2,
      },       
     {
       label: 'Total de Clientes',
       backgroundColor: ['#FE7A71'],
       borderColor: ['#DCD6F7'],
       data: [customer.length],
       barPercentage: 0.5,
         barThickness: 80,
         maxBarThickness: 90,
         minBarLength: 2,
     },       
     {
       label: 'Total de Interacciones',
       backgroundColor: ['#F0B67F'],
       borderColor: ['#DCD6F7'],
       data: [interaction.length],
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

   const userlogin = JSON.parse(localStorage.getItem("user"));
   if (userlogin == null){
       window.location.href = '/';
   } else{
     const welcomComponent = document.getElementById("welcomComponent")
     console.log(welcomComponent)
     welcomComponent.innerHTML = "Bienvenido, "+userlogin[0].name
   }   
 })();

