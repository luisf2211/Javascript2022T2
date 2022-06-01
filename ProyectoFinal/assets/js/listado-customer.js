window.addEventListener("load", event=> {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null){
        window.location.href = '/';
    } else{
      const welcomComponent = document.getElementById("welcomComponent")
      console.log(welcomComponent)
      welcomComponent.innerHTML = "Bienvenido, "+user[0].name
    } 
    
    callAPI(`${url}/customer`, "GET", {}).then( customer => {
        const ttable = document.querySelector("#table")
        const tbody = document.querySelector("#body")


        customer.forEach(customer => {
            const tr = document.createElement("tr")
            const tdid = document.createElement("td");
            tdid.innerHTML = customer.id;
            tdid.setAttribute("scope","row")
            const tdname = document.createElement("td");
            tdname.innerHTML = customer.name;
            const tdemail = document.createElement("td");
            tdemail.innerHTML = customer.email;
            const tdaddress = document.createElement("td");
            tdaddress.innerHTML = customer.address;
            const tdcreatedAt = document.createElement("td");
            tdcreatedAt.innerHTML = customer.createdAt;

            const buttonBorrar = document.createElement("button")
            buttonBorrar.classList.add("btn","btn-danger", "btn-sm")
            buttonBorrar.title ="Borrar";
            //buttonBorrar.textContent = "Borrar"
            agregarEventoBorrarcustomer(buttonBorrar, customer)
            //const tddelete = document.createElement("td");
            //tddelete.appendChild(buttonBorrar)
            const iconborrar = document.createElement("i");
            iconborrar.classList.add("bi","bi-trash3");
            buttonBorrar.appendChild(iconborrar);

            const buttonEditar = document.createElement("button")
            buttonEditar.classList.add("btn","btn-primary", "btn-sm")
            buttonEditar.title ="Editar";
            //buttonEditar.textContent = "Editar"
            agregarEventoEditarcustomer(buttonEditar, customer)
            //const tdeditar = document.createElement("td");
            //tdeditar.appendChild(buttonEditar)   
            const iconeditar = document.createElement("i");
            iconeditar.classList.add("bi","bi-file-earmark-text");
            buttonEditar.appendChild(iconeditar);

            const buttonNote = document.createElement("button")
            buttonNote.classList.add("btn","btn-info", "btn-sm")
            buttonNote.title ="Interaccion";
            agregarEventoAgregarinteraction(buttonNote, customer)
            const iconNote = document.createElement("i");
            iconNote.classList.add("bi","bi-people");
            buttonNote.appendChild(iconNote);            

            const tdaction = document.createElement("td");
            tdaction.classList.add("d-grid","gap-2","d-md-flex","justify-content-md-end")
            tdaction.appendChild(buttonNote) 
            tdaction.appendChild(buttonEditar) 
            tdaction.appendChild(buttonBorrar)          

            tr.appendChild(tdid)
            tr.appendChild(tdname)
            tr.appendChild(tdemail)
            tr.appendChild(tdaddress)
            tr.appendChild(tdcreatedAt)
            //tr.appendChild(tddelete)
            //tr.appendChild(tdeditar)
            tr.appendChild(tdaction)
            tbody.appendChild(tr)
        });
    })
})

function agregarEventoBorrarcustomer(button, customer) {
    button.addEventListener("click", event=> {
        // if(confirm(`Desea borrar el usuario ${customer.name}?`)) {
        //     callAPI(`${url}/customer/${customer.id}`, "DELETE", {})
        //     .then( ()=> window.location.reload())
        // }
        Swal.fire({
            title: `Desea borrar la interaccion ${customer.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'          
          }).then((result)=>{
            if (result.isConfirmed) {
                callAPI(`${url}/customer/${customer.id}`, "DELETE", {})
                .then( ()=> {
                    window.location.reload()
                })                                
              }           
          });              
    })
}

function agregarEventoEditarcustomer(button, customer) {
    button.addEventListener("click", event=> {
        // if(confirm(`Desea editar el usuario ${customer.name}?`)) {
        //    window.location.href = `editar-customer?id=${customer.id}`
        // }
        // Swal.fire({
        //     title: `Desea editar el usuario ${customer.name}?`,
        //     icon: 'question',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Si'          
        //   }).then((result)=>{
        //     if (result.isConfirmed) {
                window.location.href = `editar-customer?id=${customer.id}`                              
            //  }           
         // });         
    })
}

function agregarEventoAgregarinteraction(button, customer) {
    button.addEventListener("click", event=> {
        window.location.href = `insertar-interaction?id=${customer.id}`
    })
}