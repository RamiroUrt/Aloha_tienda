
    // pedido de productos al json
    let productos = [];
    fetch("../productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data;
            cargarProductos(productos);
    })
    .catch(error => {
        console.error('Error al obtener productos:', error);
    });

        const contenedorProductos = document.querySelector("#contenedor-productos");
        const botonCategorias = document.querySelectorAll(".boton-categoria"); 
        const tituloPrincipal = document.querySelector("#titulo-principal"); 
        let botonesAgregar = document.querySelectorAll(".agregar");
        const numerito = document.querySelector("#numerito");
        const editForm = document.querySelector('#edit-form');

        const aside = document.querySelector("aside");
        const openMenu = document.getElementById("open-menu");
        const closeMenu = document.getElementById("close-menu");
        //!botones menu lateral mobile
        
        openMenu.addEventListener("click", () => {
            aside.classList.add('aside-visible');
            editForm.style.display = 'none';
        })
        
        closeMenu.addEventListener("click", () => {
            aside.classList.remove('aside-visible');
        })
        
        botonCategorias.forEach(boton => boton.addEventListener("click", () =>{
            aside.classList.remove("aside-visible");
        })) 

    //funcion para crear cards de productos
        function cargarProductos(productosElegidos) {

            contenedorProductos.innerHTML = "";

            productosElegidos.forEach(producto => {
                const div = document.createElement("div");
                div.classList.add("producto");
                div.setAttribute("id", `product-${producto.id}`);
                div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}" class="prod-img" id="card-prod-img">
                    <div class="prod-detalles">
                        <h3 class="prod-titulo">${producto.titulo}</h3>
                        <p class="prod-precio">$${producto.precio}</p>
                        <button class="agregar" id="${producto.id}" name="submitButton" >Agregar</button>
                        <button class="delete-button" id="delete-button" name="delete-button" data-product-id="${producto.id}">
  <svg class="delete-svgIcon" viewBox="0 0 448 512">
  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
  </svg>
  </button>
<button class="edit-button" id="edit-button" data-product-id="${producto.id}">
<svg class="edit-svgIcon" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                    </svg>
</button>
</div>
`;
                contenedorProductos.append(div);
            })
            actualizaBotonesAgregar();
            ocultarBoton()
            Deletebtn();
            editBtn();
        }
        //funcion para cambiar/filtrar x categorias

        botonCategorias.forEach(boton => {
            boton.addEventListener("click", (event) => {
                botonCategorias.forEach(boton => boton.classList.remove("active"));
                event.currentTarget.classList.add("active");
                
                const categoriaSeleccionada = event.currentTarget.id;
                const productosBoton = (categoriaSeleccionada !== "todos") 
                    ? productos.filter(producto => producto.categoria === categoriaSeleccionada)
                    : productos;
        
                tituloPrincipal.innerText = (categoriaSeleccionada !== "todos") 
                    ? productosBoton.length > 0 ? productosBoton[0].categoria : '' // Considera si es necesario obtener solo el nombre de la primera categoría
                    : "Todos los productos";
        
                cargarProductos(productosBoton);
            });
        });
        //funcion para actualizar numerito en carrito
        function actualizaBotonesAgregar(){
            botonesAgregar = document.querySelectorAll(".agregar");
            botonesAgregar.forEach(boton => {
                boton.addEventListener("click", agregarAlCarrito);
            })
        }
        
        let productosEnCarrito;
        
        let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
        
        if (productosEnCarritoLS) {
            productosEnCarrito = JSON.parse(productosEnCarritoLS);
            actualizarNumerito();
        } else {
            productosEnCarrito = [];
        }

        
        //funcion cartel al agregar producto al carrito
        function agregarAlCarrito(event){
            Toastify({
                text: "Agregado al carrito",
                duration: 2000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    borderRadius: "4rem",
                background: "linear-gradient(to right, #bebebe , #0000 )",
                textTransform: "uppercase",
                fontSize: ".75rem",
                }, offset: {
                    x: "2rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: "2rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
                },
                onClick: function(){} // Callback after click
            }).showToast();
            const idBoton = event.currentTarget.id;
            const productoAgregado = productos.find(producto => producto.id.toString() === idBoton);
        
            if(productoAgregado){
                if (productosEnCarrito.some(producto => producto.id === idBoton)) {
                    console.log('Producto encontrado:', idBoton);
                    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
                    productosEnCarrito[index].cantidad++;
                } else {
                    productoAgregado.cantidad = 1;
                    productosEnCarrito.push(productoAgregado);
                }
                actualizarNumerito();
                localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            } else {
                console.error('Producto no encontrado:', idBoton);
            }
        }

        function actualizarNumerito() {
            let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
            numerito.innerText = nuevoNumerito;
        }
        
        var precioTexto = cardElement.querySelector("p")


        