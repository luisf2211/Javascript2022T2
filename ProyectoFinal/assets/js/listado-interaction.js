window.addEventListener("load", event=> {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null){
        window.location.href = '/';
    } else{
      const welcomComponent = document.getElementById("welcomComponent")
      console.log(welcomComponent)
      welcomComponent.innerHTML = "Bienvenido, "+user[0].name
    } 
    
    callAPI(`${url}/interaction`, "GET", {}).then( interaction => {
        const ttable = document.querySelector("#table")
        const tbody = document.querySelector("#body")


        interaction.forEach(interaction => {
            const tr = document.createElement("tr")
            const tdid = document.createElement("td");
            tdid.innerHTML = interaction.id;
            tdid.setAttribute("scope","row")
            const tdnote = document.createElement("td");
            tdnote.innerHTML = interaction.note;
            const tdcreatedAt = document.createElement("td");
            tdcreatedAt.innerHTML = interaction.createdAt;

            const tduser = document.createElement("td");
            tduser.innerHTML = interaction.user.name;
            const tdcliente = document.createElement("td");
            tdcliente.innerHTML = interaction.customer.name;

            const buttonBorrar = document.createElement("button")
            buttonBorrar.classList.add("btn","btn-danger", "btn-sm")
            buttonBorrar.title ="Borrar";
            //buttonBorrar.textContent = "Borrar"
            agregarEventoBorrarinteraction(buttonBorrar, interaction)
            //const tddelete = document.createElement("td");
            //tddelete.appendChild(buttonBorrar)
            const iconborrar = document.createElement("i");
            iconborrar.classList.add("bi","bi-trash3");
            buttonBorrar.appendChild(iconborrar);

            const buttonEditar = document.createElement("button")
            buttonEditar.classList.add("btn","btn-primary", "btn-sm")
            buttonEditar.title ="Editar";
            //buttonEditar.textContent = "Editar"
            agregarEventoEditarinteraction(buttonEditar, interaction)
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
            tr.appendChild(tdcreatedAt)
            tr.appendChild(tduser)            
            tr.appendChild(tdcliente)            
            tr.appendChild(tdnote)
            //tr.appendChild(tddelete)
            //tr.appendChild(tdeditar)
            tr.appendChild(tdaction)
            tbody.appendChild(tr)
        });
    })
})

function agregarEventoBorrarinteraction(button, interaction) {
    button.addEventListener("click", event=> {
        // if(confirm(`Desea borrar la interaccion ${interaction.id}?`)) {
        //     callAPI(`${url}/interaction/${interaction.id}`, "DELETE", {})
        //     .then( ()=> window.location.reload())
        // }
        Swal.fire({
            title: `Desea borrar la interaccion ${interaction.id}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'          
          }).then((result)=>{
            if (result.isConfirmed) {
                callAPI(`${url}/interaction/${interaction.id}`, "DELETE", {})
                .then( ()=> {
                    window.location.reload()
                })                                
              }           
          });          
    })
}

function agregarEventoEditarinteraction(button, interaction) {
    button.addEventListener("click", event=> {
        // if(confirm(`Desea editar la interaccion ${interaction.id}?`)) {
        //    window.location.href = `editar-interaction?id=${interaction.id}`
        // }
        // Swal.fire({
        //     title: `Desea editar la interaccion ${interaction.id}?`,
        //     icon: 'question',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Si'          
        //   }).then((result)=>{
        //     if (result.isConfirmed) {
                window.location.href = `editar-interaction?id=${interaction.id}`                               
              //}           
          //});          
    })
}