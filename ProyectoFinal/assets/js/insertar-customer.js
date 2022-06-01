const userForm = document.querySelector("#customer-form")

window.addEventListener("load", event=> {

    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null){
        window.location.href = '/';
    } else{
      const welcomComponent = document.getElementById("welcomComponent")
      console.log(welcomComponent)
      welcomComponent.innerHTML = "Bienvenido, "+user[0].name
    } 
})

function guardarcustomer(event) {
    event.preventDefault()

    const inputs = event.target.elements;
    var todayDate = new Date().toISOString().slice(0, 10);
    const customer = {
        id: inputs["id"].value,
        name: inputs["name"].value,
        email: inputs["email"].value,
        address: inputs["address"].value,
        createdAt: todayDate
    }

    callAPI(`${url}/customer`, "POST", customer)
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

userForm.addEventListener("submit", guardarcustomer)