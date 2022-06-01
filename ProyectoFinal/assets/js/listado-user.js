window.addEventListener("load", event=> {

    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null){
        window.location.href = '/';
    } else{
      const welcomComponent = document.getElementById("welcomComponent")
      console.log(welcomComponent)
      welcomComponent.innerHTML = "Bienvenido, "+user[0].name
    } 

    callAPI(`${url}/user`, "GET", {}).then( user => {
        const ttable = document.querySelector("#table")
        const tbody = document.querySelector("#body")

        user.forEach(user => {
            const tr = document.createElement("tr")
            const tdid = document.createElement("td");
            tdid.innerHTML = user.id;
            tdid.setAttribute("scope","row")
            const tdname = document.createElement("td");
            tdname.innerHTML = user.name;
            const tdusername = document.createElement("td");
            tdusername.innerHTML = user.username;

            const buttonBorrar = document.createElement("button")
            buttonBorrar.classList.add("btn","btn-danger", "btn-sm")
            buttonBorrar.title ="Borrar";
           // buttonBorrar.textContent = "Borrar"
            agregarEventoBorrarUser(buttonBorrar, user)
            //const tddelete = document.createElement("td");
            //tddelete.appendChild(buttonBorrar)
            const iconborrar = document.createElement("i");
            iconborrar.classList.add("bi","bi-trash3");
            buttonBorrar.appendChild(iconborrar);

            const buttonEditar = document.createElement("button")
            buttonEditar.classList.add("btn","btn-primary", "btn-sm")
            buttonEditar.title ="Editar";
            //buttonEditar.textContent = "Editar"
            agregarEventoEditarUser(buttonEditar, user)
            //const tdeditar = document.createElement("td");
            //tdeditar.appendChild(buttonEditar)            
            const iconeditar = document.createElement("i");
            iconeditar.classList.add("bi","bi-file-earmark-text");
            buttonEditar.appendChild(iconeditar);

            const tdaction = document.createElement("td");
            tdaction.classList.add("d-grid","gap-2","d-md-flex","justify-content-md-end")
            tdaction.appendChild(buttonEditar) 
            tdaction.appendChild(buttonBorrar) 

            tr.appendChild(tdid)
            tr.appendChild(tdname)
            tr.appendChild(tdusername)
            //tr.appendChild(tddelete)
            //tr.appendChild(tdeditar)
            tr.appendChild(tdaction)
            tbody.appendChild(tr)
        });
    })
})

function agregarEventoBorrarUser(button, user) {
    button.addEventListener("click", event=> {
        // if(confirm(`Desea borrar el usuario ${user.name}?`)) {
        //     callAPI(`${url}/user/${user.id}`, "DELETE", {})
        //     .then( ()=> window.location.reload())
        // }
        Swal.fire({
            title: `Esta seguro que desea borrar el usuario ${user.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'          
          }).then((result)=>{
            if (result.isConfirmed) {
                callAPI(`${url}/user/${user.id}`, "DELETE", {})
                .then( ()=> {
                    window.location.reload()
                })                                
              }           
          });          
    })
}

function agregarEventoEditarUser(button, user) {
    button.addEventListener("click", event=> {
        // if(confirm(`Desea editar el usuario ${user.name}?`)) {
        //    window.location.href = `editar-user?id=${user.id}`
        // }
        // Swal.fire({
        //     title: `Desea editar el usuario ${user.name}?`,
        //     icon: 'question',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Si'          
        //   }).then((result)=>{
        //     if (result.isConfirmed) {
                window.location.href = `editar-user?id=${user.id}`
         //     }           
         // });               
    })
}