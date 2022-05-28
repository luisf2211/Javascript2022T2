let insertCustomers = document.getElementById('insertCustomers')
const editarCliente = document.getElementById('editar-Cliente')


fetch("http://localhost:3000/customers").then(res => res.json()).then(data => {listarCustomers(data)})


function listarCustomers(datos) { 

    datos.forEach(usuarios => {

                const {id, name, lastname, email, address,createdAt} = usuarios; 
        
                insertCustomers.innerHTML +=  `
        
                <tr>
                     <th scope="row">${id}</th>
                     <td>${name}</td>
                     <td>${lastname}</td>
                     <td>${email}</td>
                     <td>${address}</td>
                     <td>${createdAt}</td>
                     <td> 
                     <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editarCliente" onclick="editarCustomer(${id})" > Editar </button>                     |
                     <button class="btn btn-danger" onclick="borrarCustomer(${id})" > Eliminar </button> 
                     </td>
                 </tr>
                
                `; 
                
            });

}

function borrarCustomer(id){
    Swal.fire({
        title: `Estas seguro de eliminar este registro?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'          
      }).then((result)=>{
        if (result.isConfirmed) {
            callAPI(`http://localhost:3000/customers/${id}`, "DELETE", {})
            .then( ()=> {
                window.location.reload()
            })                                
          }           
      });
}

console.log(editarCliente)

function editarCustomer(id) {

    (async () => {
        const clientes = await fetch(`http://localhost:3000/customers/${id}`, ).then(response => response.json());
    
        editarCliente.elements['name'].value = clientes.name; 
        editarCliente.elements['lastname'].value = clientes.lastname; 
        editarCliente.elements['mail'].value = clientes.email; 
        editarCliente.elements['address'].value = clientes.address; 

        function salvarEditarCustomer(e){
            e.preventDefault();  
            var todayDate = new Date().toISOString().slice(0, 10);
            const customer = { 
        
                name: editarCliente.elements['name'].value,
                lastname: editarCliente.elements['lastname'].value,
                email: editarCliente.elements['mail'].value,
                address: editarCliente.elements['address'].value,
                createdAt: todayDate
            }
                
            callAPI(`http://localhost:3000/customers/${id}`, "PUT", customer)
            .then( () => {
                Swal.fire({
                    title: `Cliente actualizado!!`,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Entendido'          
                  }).then((result)=>{
                    if (result.isConfirmed) {
                        window.location.href = `dashboard`                              
                      }           
                  });         
            })
        }
        
        editarCliente.addEventListener('submit', salvarEditarCustomer)

     })();
    
}

