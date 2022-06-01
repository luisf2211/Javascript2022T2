let userFormulario = document.getElementById('form-SignIn'); 

window.addEventListener("load", e => { 
    localStorage.removeItem('user')
})

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
            localStorage.setItem('user', JSON.stringify(user)); 
            window.location.href="dashboard";
            // console.log('Login...');
        }

    })    


}


userFormulario.addEventListener('submit', singIn)