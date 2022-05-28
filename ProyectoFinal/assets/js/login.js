let userForm = document.getElementById('form-SignIn'); 

function singIn(event) { 
    event.preventDefault()
    
    const inputs = event.target.elements; 
    const user = { 
        username: inputs['username'].value,
        password: inputs['password'].value
    }

    callAPI(`${url}/users/?username=${user.username}&password=${user.password}`, "GET", {})
    .then( user => {
        if (user.length === 0){
            Swal.fire({
                title: 'Oops!!',
                text: 'Revisa las credenciales ingresadas',
                icon: 'error',
                confirmButtonColor:'#3085d6',
                confirmButtonText: 'Intentar de nuevo'
              });  
        }else{
            window.location.href="dashboard";
            console.log('felicidades')
        }
    })    
}

userForm.addEventListener('submit', singIn)