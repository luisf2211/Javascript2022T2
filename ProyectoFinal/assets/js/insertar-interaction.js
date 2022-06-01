const interactionForm = document.querySelector("#interaction-form")

window.addEventListener("load", event=> {
    const id = getParam("id");
    if (id != null){
        const divcreatedAt = document.getElementById("divcreatedAt")
        const divcustomer = document.getElementById("divcustomer")

        divcreatedAt.style = "display: none"
        divcustomer.style = "display: none"
    }else{
        const inputcreatedAt = document.getElementById("createdAt");

        var date = new Date().toISOString().slice(0, 10); 
        inputcreatedAt.value = date
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null){
        window.location.href = '/';
    } else{
      const welcomComponent = document.getElementById("welcomComponent")
      console.log(welcomComponent)
      welcomComponent.innerHTML = "Bienvenido, "+user[0].name
    }     
    
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


async function guardarinteraction(event) {
    event.preventDefault()

    const id = getParam("id");
    const userid = JSON.parse(localStorage.getItem("user"))[0].id;

    const inputs = event.target.elements;
    const customername = inputs["customer"].value;
    const customeruser = inputs["user"].value;
    const customercreatedAt = inputs["createdAt"].value;

    let customer
    if (id == null)
        customer = await callAPI(`${url}/customer?name=${customername}`, "GET", {}).then( response => response)    
    else 
        customer = await callAPI(`${url}/customer?id=${id}`, "GET", {}).then( response => response)             

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
    
   let user
   if (customeruser.length === 0) 
        user = await callAPI(`${url}/user?id=${userid}`, "GET", {}).then( response => response)
    else 
        user = await callAPI(`${url}/user?name=${customeruser}`, "GET", {}).then( response => response)

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
    
    let todayDate
    if (customercreatedAt.length === 0)
        todayDate = new Date().toISOString().slice(0, 10);    
    else    
        todayDate = customercreatedAt

    const interaction = {
        id: inputs["id"].value,
        note: inputs["note"].value,
        user: user[0],
        customer: customer[0],
        createdAt: todayDate
    }
   

    callAPI(`${url}/interaction`, "POST", interaction)
    .then( () => {
        Swal.fire({
            title: `Desea volver al listado anterior?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'          
          }).then((result)=>{
            if (result.isConfirmed) {
                const id = getParam("id");
                if (id != null)
                    window.location.href = `customer`                              
                else
                    window.location.href = `interaction`                              
              }  
              else{
                inputs["note"].value = "";
              }         
          });                  
    })  
}

interactionForm.addEventListener("submit", guardarinteraction)