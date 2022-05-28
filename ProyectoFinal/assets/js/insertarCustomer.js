const userForm = document.getElementById('customer-form')

function saveCustomer(event) {
    event.preventDefault()

    const inputs = event.target.elements;

    var todayDate = new Date().toISOString().slice(0, 10);
    const customer = { 
        name: inputs['fname'].value,
        lastname: inputs['lname'].value,
        email: inputs['mail'].value,
        address: inputs['address'].value,
        createdAt: todayDate
    }
    
    callAPI("http://localhost:3000/customers/", "POST", customer)
    .then( () => {
        Swal.fire({
            title: `Cliente Insertado!!`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'          
          }).then((result)=>{
            if (result.isConfirmed) {
                window.location.href = `dashboard`                              
              }           
          });         
    })    
}

userForm.addEventListener("submit", saveCustomer)