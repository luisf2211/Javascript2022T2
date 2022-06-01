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
    callAPI(`${url}/customer/${id}`, "GET", {})
    .then( customer => {
        const customerForm = document.querySelector("#customer-form")
        customerForm.elements["id"].value = customer.id
        customerForm.elements["name"].value = customer.name
        customerForm.elements["email"].value = customer.email
        customerForm.elements["address"].value = customer.address
        customerForm.elements["createdAt"].value = customer.createdAt
    })
})

const customerForm = document.querySelector("#customer-form")
function guardarcustomer(event) {
    event.preventDefault()

    const inputs = event.target.elements;
    const customer = {
        id: inputs["id"].value,
        name: inputs["name"].value,
        email: inputs["email"].value,
        address: inputs["address"].value,
        createdAt: inputs["createdAt"].value
    }

    callAPI(`${url}/customer/${customer.id}`, "PUT", customer)
    .then( () => {
        // if (confirm(`Desea volver al listado de cliente?`)) {
        //     window.location.href = "customer"
        // }
        Swal.fire({
            title: `Desea volver al listado de cliente?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'          
          }).then((result)=>{
            if (result.isConfirmed) {
                window.location.href = `customer`                              
              }           
          });          
    })    
}


customerForm.addEventListener("submit", guardarcustomer)