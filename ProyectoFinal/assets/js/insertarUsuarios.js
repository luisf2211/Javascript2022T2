const insertUsersForm = document.getElementById('insertUsers-form')

console.log(insertUsersForm)

function insertarUsers(e) {
    e.preventDefault(); 

    const inputs = e.target.elements; 

    const users = { 
        name: inputs['name'].value, 
        username: inputs['username'].value, 
        password: inputs['password'].value 
    }

    console.log(users)

    callAPI("http://localhost:3000/users/", "POST", users)
    .then( () => {
        Swal.fire({
            title: `Usuario creado exitosamente`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Entendido'          
          }).then((result)=>{
            if (result.isConfirmed) {
                window.location.href = `users`                              
              }           
          });         
    })    
    
}

insertUsersForm.addEventListener('submit', insertarUsers)