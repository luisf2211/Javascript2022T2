
let insertUsers = document.getElementById('insertUsers');
let editarUsuarios = document.getElementById('editar-Usuarios');


fetch("http://localhost:3000/users").then(res => res.json()).then(data => {cantidadUsuarios(data)})

function cantidadUsuarios(datos) { 

    datos.forEach(usuarios => {

                const {id, name, username} = usuarios; 
        
                insertUsers.innerHTML +=  `
        
                <tr>
                     <th scope="row">${id}</th>
                     <td>${name}</td>
                     <td>${username}</td>
                     <td>
                     <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editarUsuario" onclick="editarUsuario(${id})" > Editar </button>
                      | 
                      <button class="btn btn-danger" onclick="borrarUser(${id})" > Eliminar </button> 
                     </td>
                 </tr>
                
                `; 
                
            });


}

// Funcion para borrar 

function borrarUser(id) {
    console.log(id)
    Swal.fire({
        title: `Estas seguro de eliminar este registro?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'          
      }).then((result)=>{
        if (result.isConfirmed) {
            callAPI(`http://localhost:3000/users/${id}`, "DELETE", {})
            .then( ()=> {
                window.location.reload()
            })                                
          }           
      });
}

function editarUsuario(id) {


    (async () => {
        const usuarios = await fetch(`http://localhost:3000/users/${id}`, ).then(response => response.json());

        editarUsuarios.elements['name'].value = usuarios.name; 
        editarUsuarios.elements['username'].value = usuarios.username; 
        editarUsuarios.elements['password'].value = usuarios.password; 

        console.log(usuarios); 

        function guardarCambiosUser(e) {
            e.preventDefault(); 

            const users = { 
                name: editarUsuarios.elements['name'].value, 
                username: editarUsuarios.elements['username'].value, 
                password: editarUsuarios.elements['password'].value
                
            }

            callAPI(`http://localhost:3000/users/${id}`, "PUT", users)
            .then( () => {
                Swal.fire({
                    title: `Usuario actualizado!!`,
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

        editarUsuarios.addEventListener('submit', guardarCambiosUser)

     })();
    
}
