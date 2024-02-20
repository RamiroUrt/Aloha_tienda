// async function agregarProducto() {
//     const formulario = document.getElementById("productoForm");
//     const formData = new FormData(formulario);

//     // Convierte los datos del formulario a un objeto JSON
//     const producto = {};
//     formData.forEach((value, key) => {
//         producto[key] = value;
//     });

//     try {
//         // Realiza la solicitud POST al servidor
//         const respuesta = await fetch('/agregarProducto', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(producto),
//         });

//         // Maneja la respuesta del servidor
//         const resultado = await respuesta.json();
//         console.log(resultado);
//     } catch (error) {
//         console.error('Error al enviar la solicitud:', error);
//     }
// }

document.querySelector('.button-user');
