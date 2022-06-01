window.addEventListener("load", event=> {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null){
        window.location.href = '/';
    } else{
      const welcomComponent = document.getElementById("welcomComponent")
      console.log(welcomComponent)
      welcomComponent.innerHTML = "Bienvenido, "+user[0].name
    } 
        
    const id = getParam("id");
    callAPI(`${url}/interaction/${id}`, "GET", {})
    .then( interaction => {
        console.log(interaction)
        const interactionForm = document.querySelector("#interaction-form")
        interactionForm.elements["id"].value = interaction.id
        interactionForm.elements["customer"].value = interaction.customer.name
        interactionForm.elements["user"].value = interaction.user.name
        interactionForm.elements["note"].value = interaction.note
        interactionForm.elements["createdAt"].value = interaction.createdAt
    })
})

$( function() {

    callAPI(`${url}/customer`, "GET", {})
    .then( customer => {
        let customerArray = new Array();

        customer.forEach(customer => {
            console.log(customer.name)
            customerArray.push(customer.name) 
        })
        console.log(customerArray)
        $("#customer" ).autocomplete({
            source: customerArray
          });
    })


    callAPI(`${url}/user`, "GET", {})
    .then( user => {
        let userArray = new Array();

        user.forEach(user => {
            console.log(user.name)
            userArray.push(user.name) 
        })
        console.log(userArray)
        $("#user" ).autocomplete({
            source: userArray
          });
    })    
  } );

const interactionForm = document.querySelector("#interaction-form")

async function guardarinteraction(event) {
    event.preventDefault()

    const id = getParam("id");
    const inputs = event.target.elements;
    const customername = inputs["customer"].value;
    const customeruser = inputs["user"].value;
    const customercreatedAt = inputs["createdAt"].value;

    let customer = await callAPI(`${url}/customer?name=${customername}`, "GET", {}).then( response => response)       

    if (customer.length === 0){
        Swal.fire({
            title: 'Proyecto CRM',
            text: 'Cliente no existe',
            icon: 'error',
            confirmButtonColor:'#3085d6',
            confirmButtonText: 'OK'
            });  
            return;
    }    
    
   let user = await callAPI(`${url}/user?name=${customeruser}`, "GET", {}).then( response => response)

   if (user.length === 0){
    Swal.fire({
        title: 'Proyecto CRM',
        text: 'usuario no existe',
        icon: 'error',
        confirmButtonColor:'#3085d6',
        confirmButtonText: 'OK'
      });  
      return;
    }         
    
    let todayDate = customercreatedAt

    const interaction = {
        id: inputs["id"].value,
        note: inputs["note"].value,
        user: user[0],
        customer: customer[0],
        createdAt: todayDate
    }    

    callAPI(`${url}/interaction/${interaction.id}`, "PUT", interaction)
    .then( () => {
        Swal.fire({
            title: `Desea volver al listado de interacciones?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'          
          }).then((result)=>{
            if (result.isConfirmed) {
                window.location.href = `interaction`                              
              }           
          });                 
    })  
}


interactionForm.addEventListener("submit", guardarinteraction)