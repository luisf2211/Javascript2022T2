const userForm = document.querySelector("#user-form")

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

function guardaruser(event) {
    event.preventDefault()

    const inputs = event.target.elements;
    const user = {
        id: inputs["id"].value,
        name: inputs["name"].value,
        username: inputs["username"].value,
        password: inputs["password"].value,
    }

    callAPI(`${url}/user`, "POST", user)
    .then( () => {
        // if (confirm(`Desea volver al listado de Usuario?`)) {
        //     window.location.href ="user"
        // }
        Swal.fire({
            title: `Desea volver al listado de Usuario?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'          
          }).then((result)=>{
            if (result.isConfirmed) {
                window.location.href = `user`                              
              }           
          });   
    })    
}

userForm.addEventListener("submit", guardaruser)