const userForm = document.querySelector("#form-SignIn")

window.addEventListener("load", event=> {
    localStorage.removeItem('user')
})

function buscaruser(event) {
    event.preventDefault()
    
    const inputs = event.target.elements;
    const user = {
        username: inputs["username"].value,
        password: inputs["password"].value,
    }

    callAPI(`${url}/user?username=${user.username}&password=${user.password}`, "GET", {})
    .then( user => {
        if (user.length === 0){
            Swal.fire({
                title: 'Proyecto CRM',
                text: 'User Name o Password Incorrecto',
                icon: 'error',
                confirmButtonColor:'#3085d6',
                confirmButtonText: 'OK'
              });  
        }else{
            //Window.localStorage
            localStorage.setItem('user',JSON.stringify(user))
            window.location.href="home";
        }
    })    
}

userForm.addEventListener("submit", buscaruser)