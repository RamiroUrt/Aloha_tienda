
function ocultarBoton() {
  //ocultar boton de agregar
  const botonesPorClass = document.getElementsByName('submitButton');
  botonesPorClass.forEach(boton => {
    boton.style.display = "none";
  });
  //agregar boton delete
  const deleteButtons = document.querySelectorAll("#delete-button");

  deleteButtons.forEach(deleteButton => {
    deleteButton.style.display = "flex";
  });
  //agregar boton edit
  const editButton = document.querySelectorAll("#edit-button");
  editButton.forEach(editButton => {
    editButton.style.display = "flex";
  });
  //agrando detales para acomodar y encajar botones
  const marginCard = document.querySelectorAll(".prod-detalles");
  marginCard.forEach(marginCardElement => {
    marginCardElement.style.height = "11rem";
    marginCardElement.style.padding = "3px"
    marginCardElement.style.backgroundColor = "white";
  });
}

function editBtn() {
  const editBtons = document.querySelectorAll(".edit-button");
  const editForm = document.querySelector('#edit-form');
  
  editBtons.forEach(async editBtons => {
    editBtons.addEventListener("click", async (event) => {
      // Obtener el ID del producto desde el atributo de datos
      const productId = editBtons.dataset.productId;  
      console.log('ID del producto a modificar:', productId);
      // Mostrar el formulario al hacer clic en el botón
      editForm.style.display = 'block';
      // Agregar lógica para manejar el guardado y la cancelación
      const saveButton = document.getElementById('save-button');
      const cancelButton = document.getElementById('cancel-button');
      
      saveButton.addEventListener('click', function() {
        // Ocultar el formulario después de guardar
        editForm.style.display = 'none';
      });
      cancelButton.addEventListener('click', function() {
        // Ocultar el formulario al hacer clic en el botón Cancelar
        editForm.style.display = 'none';
      });
    })
  });
}
// function editBtn() {
//   const editBtons = document.querySelectorAll(".edit-button");
//   editBtons.forEach(editBton => {
//     editBton.addEventListener("click", (event) => {
//       const productId = editBton.dataset.productId;
//       console.log('ID del producto a modificar:', productId);

//       const editForm = document.querySelector('#edit-form');
//       if (editForm) {
//         // Mostrar el formulario al hacer clic en el botón
//         editForm.style.display = 'block';
//         // Resto del código...
//       } else {
//         console.error('El formulario no fue encontrado.');
//       }
//     });
//   });
// }

// funcion al boton delete
function Deletebtn() {
  const deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach(async deleteButton => {
    deleteButton.addEventListener("click", async (event) => {
      // Obtener el ID del producto desde el atributo de datos
      const productId = deleteButton.dataset.productId;

      console.log('ID del producto a eliminar:', productId);

      try {
        // Realizar una solicitud DELETE al servidor
        const response = await fetch(`/user/${productId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Si la solicitud fue exitosa, eliminar el elemento del DOM
          deleteButton.closest('.producto').remove();
          console.log('Producto eliminado con éxito.');
            Toastify({
              text: "Producto eliminado con éxito",
              duration: 2000,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
              borderRadius: "4rem",
              background: "linear-gradient(to left, #000000 , #ffffff00 ",
              textTransform: "uppercase",
              fontSize: ".75rem",
              }, offset: {
                  x: "2rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                  y: "2rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
              onClick: function(){} // Callback after click
          }).showToast();
        } else {
          // Si la solicitud no fue exitosa, mostrar un mensaje de error
          console.error('Error al intentar eliminar el producto.');
        }
      } catch (error) {
        console.error('Error en la solicitud DELETE:', error);
      }
    });
  });
}
//mostrar form edit
// editBtn();
// Deletebtn();
// agregarBotonEliminarAlHover();
// module.exports(agregarBotonEliminarAlHover());